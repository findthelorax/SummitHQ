import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useEmployees } from '../../hooks/useEmployees';
import { mountainApi } from '../../api/MountainAPI';
import { EmployeeInputPayload } from '../../api/EmployeeAPI';
import type { Employee, Role, Mountain } from 'shared/types';
import { EMPLOYEE_STATUS } from 'shared/types/enums';
import { EMPLOYEE_STATUS_LABELS } from 'shared/types/utils/enumLabels';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent, ICellRendererParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const emptyForm: EmployeeInputPayload = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	roleId: '',
	employeeStatus: EMPLOYEE_STATUS.ACTIVE,
};

type EmployeeRow = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	department: string;
	role: string;
	employeeStatus: EMPLOYEE_STATUS;
	mountain: string;
	mountainLocation: string;
};

const AdminEmployees: React.FC = () => {
	const { employees, isLoading, createEmployee, updateEmployee, deleteEmployee, roles, fetchEmployees } =
		useEmployees();

	const [mountains, setMountains] = useState<Mountain[]>([]);
	const [form, setForm] = useState<EmployeeInputPayload>(emptyForm);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const gridRef = useRef<AgGridReact<EmployeeRow>>(null);

	const fetchMountains = useCallback(async () => {
		try {
			const mtns = await mountainApi.getAllMountains();
			setMountains(mtns);
		} catch {
			setError('Failed to fetch mountains');
		}
	}, []);

	useEffect(() => {
		fetchMountains();
	}, [fetchMountains]);

	useEffect(() => {
		fetchMountains();
	}, [employees, fetchMountains]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		try {
			if (editingId) {
				await updateEmployee(editingId, form);
				setSuccess('Employee updated!');
			} else {
				await createEmployee(form);
				setSuccess('Employee added!');
			}
			setForm(emptyForm);
			setEditingId(null);
			await fetchEmployees();
			await fetchMountains();
		} catch {
			setError('Failed to save employee');
		}
	};

	const handleEdit = (item: Employee) => {
		setEditingId(item.id);
		setSuccess(null);
		setForm({
			firstName: item.firstName || '',
			lastName: item.lastName || '',
			email: item.email || '',
			phoneNumber: item.phoneNumber || '',
			roleId: item.roleId || '',
			employeeStatus: (item.employeeStatus as EMPLOYEE_STATUS) || EMPLOYEE_STATUS.ACTIVE,
		});
	};

	const handleDelete = async (id: string) => {
		if (!window.confirm('Delete this employee?')) return;
		setError(null);
		setSuccess(null);
		try {
			await deleteEmployee(id);
			await fetchEmployees();
			await fetchMountains();
		} catch {
			setError('Failed to delete employee');
		}
	};

	const handleCancel = () => {
		setEditingId(null);
		setForm(emptyForm);
		setError(null);
		setSuccess(null);
	};

	const ActionButtons: React.FC<ICellRendererParams<EmployeeRow>> = (params) => {
		const handleEditClick = () => {
			if (!params.data) return;
			const emp = employees.find((e) => e.id === params.data!.id);
			if (emp) handleEdit(emp);
		};
		const handleDeleteClick = async () => {
			if (params.data) {
				await handleDelete(params.data.id);
			}
		};
		return (
			<div style={{ display: 'flex', gap: 8 }}>
				<button
					onClick={handleEditClick}
					style={{
						padding: '2px 8px',
						borderRadius: 4,
						background: '#2563eb',
						color: 'white',
						border: 'none',
						cursor: 'pointer',
						fontSize: 12,
					}}
				>
					Edit
				</button>
				<button
					onClick={handleDeleteClick}
					style={{
						padding: '2px 8px',
						borderRadius: 4,
						background: '#dc2626',
						color: 'white',
						border: 'none',
						cursor: 'pointer',
						fontSize: 12,
					}}
				>
					Delete
				</button>
			</div>
		);
	};

	const columnDefs: ColDef<EmployeeRow>[] = [
		{ headerName: 'First Name', field: 'firstName', minWidth: 120 },
		{ headerName: 'Last Name', field: 'lastName', minWidth: 120 },
		{ headerName: 'Email', field: 'email', minWidth: 180 },
		{ headerName: 'Phone', field: 'phoneNumber', minWidth: 120 },
		{ headerName: 'Department', field: 'department', minWidth: 120 },
		{ headerName: 'Role', field: 'role', minWidth: 120 },
		{
			headerName: 'Status',
			field: 'employeeStatus',
			minWidth: 100,
			valueFormatter: (params) => EMPLOYEE_STATUS_LABELS[params.value as EMPLOYEE_STATUS],
		},
		{ headerName: 'Mountain', field: 'mountain', minWidth: 140 },
		{ headerName: 'Mountain Location', field: 'mountainLocation', minWidth: 160 },
		{
			headerName: 'Actions',
			cellRenderer: ActionButtons,
			minWidth: 120,
			pinned: 'right',
		},
	];

	const rowData: EmployeeRow[] = employees.map((emp) => {
		const role = roles.find((r) => r.id === emp.roleId);
		const assignment = emp.mountainAssignments?.[0]; // Use first assignment, or adjust as needed
		const mountain = assignment ? mountains.find((m) => m.id === assignment.mountainId) : undefined;
		return {
			id: emp.id,
			firstName: emp.firstName,
			lastName: emp.lastName,
			email: emp.email,
			phoneNumber: emp.phoneNumber,
			department: role?.department ?? '',
			role: role ? `${role.title}${role.position ? ` - ${role.position}` : ''}` : '',
			employeeStatus: emp.employeeStatus as EMPLOYEE_STATUS,
			mountain: mountain?.name ?? '',
			mountainLocation: mountain ? `${mountain.city}, ${mountain.state}` : '',
		};
	});

	const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
		const container = document.getElementById('ag-employee-table-container');
		const gridWidth = container ? container.offsetWidth : window.innerWidth;
		let totalColsWidth = 0;
		const columnsToShow: string[] = [];
		const columnsToHide: string[] = [];
		const allColumns = params.api.getColumns();
		if (allColumns && allColumns.length > 0) {
			for (let i = 0; i < allColumns.length; i++) {
				const column = allColumns[i];
				totalColsWidth += column.getMinWidth() || 0;
				if (totalColsWidth > gridWidth) {
					columnsToHide.push(column.getColId());
				} else {
					columnsToShow.push(column.getColId());
				}
			}
		}
		params.api.setColumnsVisible(columnsToShow, true);
		params.api.setColumnsVisible(columnsToHide, false);
		setTimeout(() => {
			params.api.sizeColumnsToFit();
		}, 10);
	}, []);

	const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
		params.api.sizeColumnsToFit();
	}, []);

	const groupedRoles = roles.reduce((acc, role) => {
		const dept = role.department || 'Other';
		if (!acc[dept]) acc[dept] = [];
		acc[dept].push(role);
		return acc;
	}, {} as Record<string, Role[]>);

	const renderInput = (name: keyof EmployeeInputPayload, type = 'text', required = false) => (
		<input
			className="border p-2 rounded flex-1"
			name={name}
			placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
			type={type}
			value={form[name] ?? ''}
			onChange={handleChange}
			required={required}
		/>
	);

	return (
		<div className="max-w-6xl mx-auto p-4">
			<h2 className="text-xl font-bold mb-4">All Employees</h2>
			{error && <div className="text-red-600 mb-2">{error}</div>}
			{success && <div className="text-green-600 mb-2">{success}</div>}
			<form
				onSubmit={handleSubmit}
				className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-4"
			>
				{renderInput('firstName', 'text', true)}
				{renderInput('lastName', 'text', true)}
				{renderInput('email', 'email', true)}
				{renderInput('phoneNumber')}
				<select className="dropdown" name="roleId" value={form.roleId ?? ''} onChange={handleChange} required>
					<option value="">Select Role</option>
					{Object.entries(groupedRoles).map(([department, roles]) => (
						<optgroup key={department} label={department}>
							{roles.map((role) => (
								<option key={role.id} value={role.id}>
									{role.title} {role.position ? `- ${role.position}` : ''}
								</option>
							))}
						</optgroup>
					))}
				</select>
				<select
					className="dropdown"
					name="employeeStatus"
					value={form.employeeStatus}
					onChange={handleChange}
					required
				>
					{Object.entries(EMPLOYEE_STATUS_LABELS).map(([key, label]) => (
						<option key={key} value={key}>
							{label}
						</option>
					))}
				</select>
				<div className="flex gap-2 mt-2">
					<button
						type="submit"
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
					>
						{editingId ? 'Update' : 'Add'}
					</button>
					{editingId && (
						<button
							type="button"
							onClick={handleCancel}
							className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
						>
							Cancel
						</button>
					)}
				</div>
			</form>
			<div
				id="ag-employee-table-container"
				className="ag-theme-quartz"
				style={{
					width: '100%',
					minWidth: 300,
				}}
			>
				<AgGridReact<EmployeeRow>
					ref={gridRef}
					columnDefs={columnDefs}
					rowData={rowData}
					domLayout="autoHeight"
					components={{ ActionButtons }}
					overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading employees...</span>'}
					loadingOverlayComponentParams={{ loadingMessage: 'Loading employees...' }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: 'No employees found.' }}
					loading={isLoading}
					autoSizeStrategy={{
						type: 'fitCellContents',
					}}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					suppressHorizontalScroll
					getRowId={(params) => params.data.id}
				/>
			</div>
		</div>
	);
};

export default AdminEmployees;

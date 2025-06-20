import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';
import DatePickerCellEditor from '../aggrid/DatePickerCellEditor';

// Types & Enums
import type { EmployeesTableAgGridProps, EmployeeRow } from '../../utils/AgGrid/tableTypes';
import {
    EMPLOYEE_STATUS_LABELS,
    EMPLOYEE_STATUS,
    DEPARTMENT_LABELS,
    DEPARTMENT,
    ROLE_LEVEL_LABELS,
    ROLE_LEVEL,
    getEnumLabel,
} from '../../types/generated-enums';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';

// Utils & Helpers
import { createEditableCell } from '../../utils/common/createEditableCell';
import { placeholderFormatter, formatDate } from '../../utils/common/formatData';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';
import { getEmptyNewEmployeeRow } from '../../utils/AgGrid/rowFactories';
import { mapEmployeeToRow } from '../../utils/AgGrid/mapToRow';
import { employeeRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';

// Components
import ActionButtons from '../buttons/ActionButtons';

const PermissionsCellRenderer: React.FC<{ value?: string }> = (params) => {
	if (!params.value) return null;
	const permissions = params.value
		.split(',')
		.map((p: string) => p.trim())
		.filter(Boolean);
	return (
		<ul style={{ margin: 0, paddingLeft: '1.2em' }}>
			{permissions.map((perm: string, idx: number) => (
				<li key={idx} style={{ marginBottom: -5 }}>
					{perm
						.toLowerCase()
						.split('_')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')}
				</li>
			))}
		</ul>
	);
};

const AdminEmployeeTableAgGrid: React.FC<EmployeesTableAgGridProps> = ({
	employees,
	mountains,
	roles,
	isLoading,
	fetchEmployees,
	updateEmployee,
	deleteEmployee,
	onAddEmployee,
	onEditEmployee,
}) => {
	const [addEmployeeRow, setAddEmployeeRow] = useState<EmployeeRow>(getEmptyNewEmployeeRow());
	const [editEmployeeRow, setEditEmployeeRow] = useState<EmployeeRow>(getEmptyNewEmployeeRow());
	const [editingRowId, setEditingRowId] = useState<string | null>(null);

	const { showSnackbar } = useSnackbarContext();

	const getRoleOptions = (department: string) =>
		roles
			.filter((role) => role.department === department)
			.map((role) => ({
				value: role.title,
				label: role.title,
				position: role.position,
			}));

	const mountainOptions = mountains ? mountains.map((m) => m.id) : [];

	const mountainNameFormatter = (params: any) => {
		const mountain = mountains?.find((m) => m.id === params.value);
		return mountain ? mountain.name : params.value || '';
	};

	const editableCell = (field: keyof EmployeeRow) =>
		createEditableCell<EmployeeRow>(field, {
			selectOptions:
				field === 'status'
					? (Object.keys(EMPLOYEE_STATUS_LABELS) as EMPLOYEE_STATUS[])
					: field === 'primaryDepartment' || field === 'roleDepartment'
					? (Object.keys(DEPARTMENT_LABELS) as DEPARTMENT[])
					: field === 'roleLevel'
					? (Object.keys(ROLE_LEVEL_LABELS) as ROLE_LEVEL[])
					: undefined,
			cellEditor: field === 'startDate' || field === 'endDate' ? 'datePickerCellEditor' : undefined,
			getRowState: (params) => {
				if (params.data?.isNew) return addEmployeeRow;
				if (params.data?.id === editingRowId) return editEmployeeRow;
				return getEmptyNewEmployeeRow();
			},
			setRowState: (updater, params) => {
				if (params.data?.isNew) setAddEmployeeRow(updater);
				else if (params.data?.id === editingRowId) setEditEmployeeRow(updater);
			},
			editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
		});

	const withPlaceholder = (formatter?: (params: any) => string) => (params: any) => {
		const placeholder = placeholderFormatter(params);
		if (placeholder !== params.value) return placeholder;
		return formatter ? formatter(params) : params.value;
	};

	const columnDefs = useMemo(
		() => [
			{
				headerName: 'First Name',
				field: 'firstName',
				flex: 1,
				valueFormatter: withPlaceholder(),
				...editableCell('firstName'),
			},
			{
				headerName: 'Last Name',
				field: 'lastName',
				sort: 'asc',
				valueFormatter: withPlaceholder(),
				...editableCell('lastName'),
			},
			{ headerName: 'Email', field: 'email', valueFormatter: withPlaceholder(), ...editableCell('email') },
			{
				headerName: 'Phone',
				field: 'phoneNumber',
				valueFormatter: withPlaceholder(),
				...editableCell('phoneNumber'),
			},
			{
				headerName: 'Status',
				field: 'status',
				minWidth: 100,
				valueFormatter: withPlaceholder((params: any) => getEnumLabel(params.value, EMPLOYEE_STATUS_LABELS)),
				...editableCell('status'),
			},
			{
				headerName: 'Primary Department',
				field: 'primaryDepartment',
				minWidth: 150,
				valueFormatter: (params: any) => DEPARTMENT_LABELS[params.value as DEPARTMENT],
				...editableCell('primaryDepartment'),
			},
			{
				headerName: 'Role Department',
				field: 'roleDepartment',
				minWidth: 120,
				valueFormatter: (params: any) => DEPARTMENT_LABELS[params.value as DEPARTMENT],
				...editableCell('roleDepartment'),
			},
			{
				headerName: 'Role Title',
				field: 'roleTitle',
				minWidth: 120,
				valueFormatter: withPlaceholder(),
				...editableCell('roleTitle'),
			},
			{
				headerName: 'Role Position',
				field: 'rolePosition',
				minWidth: 120,
				valueFormatter: withPlaceholder(),
				...editableCell('rolePosition'),
			},
			{
				headerName: 'Role Level',
				field: 'roleLevel',
				minWidth: 120,
				valueFormatter: (params: any) => ROLE_LEVEL_LABELS[params.value as ROLE_LEVEL],
				...editableCell('roleLevel'),
			},
			{
				headerName: 'Role Permissions',
				field: 'rolePermissions',
				minWidth: 180,
				cellRenderer: PermissionsCellRenderer,
				autoHeight: true,
				...editableCell('rolePermissions'),
			},
			{
				headerName: 'Start Date',
				field: 'startDate',
				minWidth: 150,
				valueFormatter: (params: any) => formatDate(params.value),
				...editableCell('startDate'),
			},
			{
				headerName: 'End Date',
				field: 'endDate',
				minWidth: 150,
				valueFormatter: (params: any) => formatDate(params.value),

				...editableCell('endDate'),
			},
			{ headerName: 'Certifications', field: 'certifications', minWidth: 180, ...editableCell('certifications') },
			{
				headerName: 'Mountain Name',
				field: 'mountainId',
				minWidth: 160,
				...editableCell('mountainId'),
				cellEditor: 'agSelectCellEditor',
				cellEditorParams: {
					values: mountainOptions,
				},
				valueFormatter: mountainNameFormatter,
				valueSetter: (params: any) => {
					const selectedMountain = mountains?.find((m) => m.id === params.newValue);
					if (selectedMountain) {
						if (params.data.isNew) {
							setAddEmployeeRow((prev) => ({
								...prev,
								mountainId: selectedMountain.id,
								assignedMountainCity: selectedMountain.city ?? '',
								assignedMountainState: selectedMountain.state ?? '',
							}));
						} else if (params.data.id === editingRowId) {
							setEditEmployeeRow((prev) => ({
								...prev,
								mountainId: selectedMountain.id,
								assignedMountainCity: selectedMountain.city ?? '',
								assignedMountainState: selectedMountain.state ?? '',
							}));
						}
						return true;
					}
					return false;
				},
			},
			{
				headerName: 'Mountain City',
				field: 'assignedMountainCity',
				minWidth: 120,
				...editableCell('assignedMountainCity'),
				editable: false,
			},
			{
				headerName: 'Mountain State',
				field: 'assignedMountainState',
				minWidth: 80,
				...editableCell('assignedMountainState'),
				editable: false,
			},
			{
				headerName: 'Actions',
				cellRenderer: ActionButtons,
				cellRendererParams: generateActionCellRendererParams<EmployeeRow>(
					editingRowId,
					addEmployeeRow,
					setAddEmployeeRow,
					onAddEmployee ? (row: EmployeeRow) => onAddEmployee(employeeRowToInputPayload(row)) : undefined,
					(row: EmployeeRow) => {
						setEditEmployeeRow({ ...row });
						setEditingRowId(row.id ?? '');
					},
					async (row: EmployeeRow) => {
						await updateEmployee(row.id ?? '', employeeRowToInputPayload(row));
						setEditingRowId(null);
						setEditEmployeeRow(getEmptyNewEmployeeRow());
					},
					() => {
						setEditingRowId(null);
						setEditEmployeeRow(getEmptyNewEmployeeRow());
						setAddEmployeeRow(getEmptyNewEmployeeRow());
					},
					(row: EmployeeRow) => {
						const emp = employees.find((e) => e.id === row.id);
						if (emp) deleteEmployee(emp.id);
					},
					fetchEmployees,
					(msg: string, type?: string) => {},
					getEmptyNewEmployeeRow,
					['firstName', 'lastName']
				),
				minWidth: 120,
				pinned: 'right',
				suppressSizeToFit: true,
			},
		],
		[
			employees,
			editingRowId,
			addEmployeeRow,
			setAddEmployeeRow,
			editEmployeeRow,
			setEditEmployeeRow,
			fetchEmployees,
			updateEmployee,
			deleteEmployee,
			onAddEmployee,
		]
	);

	return (
		<EntityTableAgGrid
			entityName="employee"
			entities={employees}
			fetchEntities={fetchEmployees}
			isLoading={isLoading}
			updateEntity={updateEmployee}
			deleteEntity={deleteEmployee}
			onAddEntity={onAddEmployee}
			getEmptyNewRow={getEmptyNewEmployeeRow}
			mapToRow={mapEmployeeToRow}
			inputPayloadConverter={employeeRowToInputPayload}
			columnDefs={columnDefs}
			requiredFields={['firstName', 'lastName']}
			components={{
				datePickerCellEditor: DatePickerCellEditor,
				ActionButtons,
			}}
			editingRowId={editingRowId}
			setEditingRowId={setEditingRowId}
			agGridContext={{
				editingRowId,
				setRowState: (row: any, params: any) => {
					if (params.data?.isNew) setAddEmployeeRow(row);
					else if (params.data?.id === editingRowId) setEditEmployeeRow(row);
				},
			}}
			newRow={addEmployeeRow}
			setNewRow={setAddEmployeeRow}
		/>
	);
};

export default AdminEmployeeTableAgGrid;

import React, { useEffect, useState } from 'react';
import { employeeApi, EmployeeInputPayload } from '../../api/EmployeeAPI';
import type { Employee, Role } from 'shared/types';
import { DEPARTMENT, EMPLOYEE_STATUS } from 'shared/types/enums';
import { DEPARTMENT_LABELS, EMPLOYEE_STATUS_LABELS } from 'shared/types/utils/enumLabels';

const emptyForm: EmployeeInputPayload = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
	roleId: '',
	employeeStatus: EMPLOYEE_STATUS.ACTIVE,
};

const AdminEmployees: React.FC = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [roles, setRoles] = useState<Role[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState<EmployeeInputPayload>(emptyForm);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const fetchEmployees = async () => {
		setIsLoading(true);
		try {
			const data = await employeeApi.getEmployees();
			setEmployees(data);
		} catch {
			setError('Failed to fetch employees');
		} finally {
			setIsLoading(false);
		}
	};

	const fetchRoles = async () => {
		try {
			const data = await employeeApi.getAllRoles();
			setRoles(data);
		} catch {
			setError('Failed to fetch roles');
		}
	};

	useEffect(() => {
		fetchEmployees();
		fetchRoles();
	}, []);

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
			const payload: EmployeeInputPayload = {
				firstName: form.firstName,
				lastName: form.lastName,
				email: form.email,
				phoneNumber: form.phoneNumber,
				roleId: form.roleId,
				employeeStatus: form.employeeStatus,
			};
			if (editingId) {
				await employeeApi.updateEmployee(editingId, payload);
				setSuccess('Employee updated!');
			} else {
				await employeeApi.createEmployee(payload);
				setSuccess('Employee added!');
			}
			setForm(emptyForm);
			setEditingId(null);
			await fetchEmployees();
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
			await employeeApi.deleteEmployee(id);
			await fetchEmployees();
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

	const groupedRoles = roles.reduce((acc, role) => {
		const dept = role.department || 'Other';
		if (!acc[dept]) acc[dept] = [];
		acc[dept].push(role);
		return acc;
	}, {} as Record<string, Role[]>);

	return (
		<div className="max-w-5xl mx-auto p-4">
			<h2 className="text-xl font-bold mb-4">All Employees</h2>
			{error && <div className="text-red-600 mb-2">{error}</div>}
			{success && <div className="text-green-600 mb-2">{success}</div>}
			<form
				onSubmit={handleSubmit}
				className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-4"
			>
				<input
					className="border p-2 rounded flex-1"
					name="firstName"
					placeholder="First Name"
					value={form.firstName}
					onChange={handleChange}
					required
				/>
				<input
					className="border p-2 rounded flex-1"
					name="lastName"
					placeholder="Last Name"
					value={form.lastName}
					onChange={handleChange}
					required
				/>
				<input
					className="border p-2 rounded flex-1"
					name="email"
					placeholder="Email"
					type="email"
					value={form.email}
					onChange={handleChange}
					required
				/>
				<input
					className="border p-2 rounded flex-1"
					name="phoneNumber"
					placeholder="Phone Number"
					value={form.phoneNumber}
					onChange={handleChange}
				/>
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
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="overflow-x-auto max-h-[500px] border rounded">
					<table className="min-w-full bg-white">
						<thead className="sticky top-0 bg-gray-200">
							<tr>
								<th className="border px-2 py-1">Name</th>
								<th className="border px-2 py-1">Email</th>
								<th className="border px-2 py-1">Role</th>
								<th className="border px-2 py-1">Status</th>
								<th className="border px-2 py-1">Actions</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((item) => (
								<tr key={item.id}>
									<td className="border px-2 py-1">{item.firstName}</td>
									<td className="border px-2 py-1">{item.lastName}</td>
									<td className="border px-2 py-1">{item.email}</td>
									<td className="dropdown">
										{(() => {
											const role = roles.find((r) => r.id === item.roleId);
											return role
												? `${role.title}${role.position ? ` - ${role.position}` : ''}`
												: '';
										})()}
									</td>
									<td className="dropdown">
										{
											EMPLOYEE_STATUS_LABELS[
												item.employeeStatus as keyof typeof EMPLOYEE_STATUS_LABELS
											]
										}
									</td>
									<td className="border px-2 py-1">
										<button
											onClick={() => handleEdit(item)}
											className="text-blue-600 hover:underline mr-2"
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(item.id)}
											className="text-red-600 hover:underline"
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default AdminEmployees;

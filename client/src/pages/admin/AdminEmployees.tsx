import React, { useEffect, useState } from 'react';
import { employeeApi } from '../../api/EmployeeAPI';
import type { Employee } from 'shared/types';
import { EMPLOYEE_ROLES, DEPARTMENT } from 'shared/types/enums';

type EmployeeInputPayload = {
    employeeIdNumber: number | '';
    email: string;
    phoneNumber: string;
    name: string;
    roleId?: string;
    department?: DEPARTMENT;
};

const emptyForm: EmployeeInputPayload = {
    employeeIdNumber: '',
    email: '',
    phoneNumber: '',
    name: '',
    roleId: '',
    department: DEPARTMENT.OTHER,
};

const AdminEmployees: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<EmployeeInputPayload>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const data = await employeeApi.getEmployees();
            setEmployees(data);
        } catch (e) {
            setError('Failed to fetch employees');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'number' || name === 'employeeIdNumber'
                ? value === '' ? '' : Number(value)
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (editingId) {
                await employeeApi.updateEmployee(editingId, {
                    ...form,
                    employeeIdNumber: form.employeeIdNumber === '' ? 0 : form.employeeIdNumber,
                });
            } else {
                await employeeApi.createEmployee({
                    ...form,
                    employeeIdNumber: form.employeeIdNumber === '' ? 0 : form.employeeIdNumber,
                    roleId: form.roleId === undefined ? null : form.roleId,
                });
            }
            setForm(emptyForm);
            setEditingId(null);
            await fetchEmployees();
        } catch (e) {
            setError('Failed to save employee');
        }
    };

    const handleEdit = (item: Employee) => {
        setEditingId(item.id);
        setForm({
            employeeIdNumber: item.employeeIdNumber ?? '',
            email: item.email || '',
            phoneNumber: item.phoneNumber || '',
            name: item.name || '',
            roleId: item.roleId || '',
            department: (item as any).department || DEPARTMENT.OTHER,
        });
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this employee?')) return;
        setError(null);
        try {
            await employeeApi.deleteEmployee(id);
            await fetchEmployees();
        } catch (e) {
            setError('Failed to delete employee');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">All Employees</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-4">
                <input
                    className="border p-2 rounded flex-1"
                    name="employeeIdNumber"
                    placeholder="Employee ID Number"
                    type="number"
                    value={form.employeeIdNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="name"
                    placeholder="Name"
                    value={form.name}
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
                <input
                    className="border p-2 rounded flex-1"
                    name="roleId"
                    placeholder="Role ID"
                    value={form.roleId}
                    onChange={handleChange}
                />
                <select
                    className="border p-2 rounded flex-1"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                >
                    {Object.values(DEPARTMENT).map((dept) => (
                        <option key={dept} value={dept}>
                            {dept.replace(/_/g, ' ')}
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
                <ul className="divide-y divide-gray-300">
                    {employees.map((item) => (
                        <li key={item.id} className="flex items-center justify-between py-2">
                            <span>
                                <span className="font-semibold">{item.name}</span>
                                {item.email && `, ${item.email}`}
                                {'department' in item && (item as any).department && `, ${(item as any).department}`}
                            </span>
                            <span className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminEmployees;
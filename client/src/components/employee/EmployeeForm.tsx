import React, { useState } from 'react';
import { EMPLOYEE_STATUS } from 'shared/types/enums';
import { useEmployees } from '../../hooks/useEmployees';
import type { EmployeeInputPayload } from '../../api/EmployeeAPI';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

const emptyForm: EmployeeInputPayload = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roleId: null,
    employeeStatus: EMPLOYEE_STATUS.INACTIVE,
};

const EmployeeForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
    const [form, setForm] = useState<EmployeeInputPayload>(emptyForm);
    const [loading, setLoading] = useState(false);

    const { filteredRoleOptions, selectedDepartment, createEmployee } = useEmployees();
    const { showSnackbar } = useSnackbarContext(); // <-- Use the snackbar context

    const groupedRoles = filteredRoleOptions.reduce((acc, role: { label: string; value: string; department?: string }) => {
        const department = role.department || 'Other';
        if (!acc[department]) acc[department] = [];
        acc[department].push(role);
        return acc;
    }, {} as Record<string, typeof filteredRoleOptions>);

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm((prev) => ({
            ...prev,
            roleId: e.target.value === '' ? null : e.target.value,
        }));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm((prev) => ({
            ...prev,
            employeeStatus: e.target.value as EMPLOYEE_STATUS,
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createEmployee({
                ...form,
                roleId: form.roleId ?? null,
            });
            setForm(emptyForm);
            showSnackbar('Employee added successfully!', 'success');
            if (onCreated) onCreated();
        } catch {
            showSnackbar('Error adding employee', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Phone Number</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Role</label>
                <select name="roleId" value={form.roleId ?? ''} onChange={handleRoleChange} className="dropdown">
                    <option value="">Select Role</option>
                    {Object.entries(groupedRoles).map(([department, roles]) => (
                        <optgroup key={department} label={department}>
                            {roles.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Status</label>
                <select
                    name="employeeStatus"
                    value={form.employeeStatus}
                    onChange={handleStatusChange}
                    className="dropdown"
                >
                    {Object.values(EMPLOYEE_STATUS).map((status) => (
                        <option key={status} value={status}>
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Employee'}
            </button>
        </form>
    );
};

export default EmployeeForm;
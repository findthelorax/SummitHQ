import React, { useState } from 'react';
import { employeeApi } from '../../api/EmployeeAPI';
import { DEPARTMENT } from 'shared/types/enums';

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

const EmployeeForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
    const [form, setForm] = useState<EmployeeInputPayload>(emptyForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

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
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await employeeApi.createEmployee({
                ...form,
                employeeIdNumber: form.employeeIdNumber === '' ? 0 : form.employeeIdNumber,
                roleId: form.roleId === undefined ? null : form.roleId,
            });
            setForm(emptyForm);
            setSuccess('Employee added successfully!');
            if (onCreated) onCreated();
        } catch {
            setError('Error adding employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="bg-white dark:bg-gray-800 rounded shadow p-6 max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Employee ID Number</label>
                <input
                    type="number"
                    name="employeeIdNumber"
                    value={form.employeeIdNumber}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
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
                <label className="block mb-1 font-semibold">Role ID</label>
                <input
                    type="text"
                    name="roleId"
                    value={form.roleId}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Department</label>
                <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                >
                    {Object.values(DEPARTMENT).map((dept) => (
                        <option key={dept} value={dept}>
                            {dept.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
            </div>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {success && <div className="text-green-600 mb-2">{success}</div>}
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
import React, { useEffect, useState } from 'react';
import { employeeApi } from '../../api/EmployeeAPI';
import type { Role } from 'shared/types';
import { ROLE_LEVEL_LABELS, DEPARTMENT_LABELS } from 'shared/types/utils/enumLabels';

const emptyRole: Partial<Role> = {
    department: undefined,
    title: '',
    position: '',
    level: undefined,
    permissions: [],
};

const AdminRoles: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [form, setForm] = useState<Partial<Role>>(emptyRole);
    const [loading, setLoading] = useState(false);

    const fetchRoles = async () => {
        setLoading(true);
        const data = await employeeApi.getAllRoles();
        setRoles(
            data.map((item: any) => ({
                id: item.id,
                department: item.department ?? undefined,
                title: item.title ?? '',
                position: item.position ?? '',
                level: item.level,
                permissions: item.permissions ?? [],
            }))
        );
        setLoading(false);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'permissions' ? value.split(',').map((p) => p.trim()) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await employeeApi.createRole(form);
        setForm(emptyRole);
        fetchRoles();
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Roles</h2>
            <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2 items-end">
                <select
                    name="department"
                    value={form.department || ''}
                    onChange={handleChange}
                    className="dropdown"
                    required
                >
                    <option value="">Department</option>
                    {Object.entries(DEPARTMENT_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
                <input
                    name="title"
                    value={form.title || ''}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border px-2 py-2 rounded w-40"
                />
                <input
                    name="position"
                    value={form.position || ''}
                    onChange={handleChange}
                    placeholder="Role Name"
                    className="border px-2 py-2 rounded w-40"
                    required
                />
                <select
                    name="level"
                    value={form.level || ''}
                    onChange={handleChange}
                    className="dropdown"
                    required
                >
                    <option value="">Level</option>
                    {Object.entries(ROLE_LEVEL_LABELS).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
                <input
                    name="permissions"
                    value={Array.isArray(form.permissions) ? form.permissions.join(',') : ''}
                    onChange={handleChange}
                    placeholder="Permissions (comma separated)"
                    className="border px-2 py-2 rounded w-40"
                />
                <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded">
                    Add Role
                </button>
            </form>
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Department</th>
                        <th className="border px-2 py-1">Title</th>
                        <th className="border px-2 py-1">Position</th>
                        <th className="border px-2 py-1">Level</th>
                        <th className="border px-2 py-1">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : (
                        roles.map((role) => (
                            <tr key={role.id}>
                                <td className="border px-2 py-1">
                                    {DEPARTMENT_LABELS[role.department as keyof typeof DEPARTMENT_LABELS]}
                                </td>
                                <td className="border px-2 py-1">{role.title}</td>
                                <td className="border px-2 py-1">{role.position}</td>
                                <td className="border px-2 py-1">
                                    {ROLE_LEVEL_LABELS[role.level as keyof typeof ROLE_LEVEL_LABELS]}
                                </td>
                                <td className="border px-2 py-1">{role.permissions?.join(', ')}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminRoles;
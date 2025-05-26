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

const fieldConfigs = [
    {
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        required: true,
    },
    {
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        required: true,
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
    },
    {
        label: 'Phone Number',
        name: 'phoneNumber',
        type: 'text',
        required: false,
    },
    {
        label: 'Role',
        name: 'roleId',
        type: 'role-select',
        required: false,
    },
    {
        label: 'Status',
        name: 'employeeStatus',
        type: 'status-select',
        required: true,
    },
];

const FormField = ({
    field,
    value,
    onChange,
    groupedRoles,
}: {
    field: any;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    groupedRoles?: Record<string, any[]>;
}) => {
    if (field.type === 'role-select') {
        return (
            <div className="mb-4">
                <label className="block mb-1 font-semibold">{field.label}</label>
                <select name="roleId" value={value ?? ''} onChange={onChange} className="dropdown">
                    <option value="">Select Role</option>
                    {groupedRoles &&
                        Object.entries(groupedRoles).map(([department, roles]) => (
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
        );
    }
    if (field.type === 'status-select') {
        return (
            <div className="mb-4">
                <label className="block mb-1 font-semibold">{field.label}</label>
                <select
                    name="employeeStatus"
                    value={value}
                    onChange={onChange}
                    className="dropdown"
                >
                    {Object.values(EMPLOYEE_STATUS).map((status) => (
                        <option key={status} value={status}>
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
                type={field.type}
                name={field.name}
                value={value}
                onChange={onChange}
                required={field.required}
                className="w-full border rounded px-3 py-2"
            />
        </div>
    );
};

const EmployeeForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
    const [form, setForm] = useState<EmployeeInputPayload>(emptyForm);
    const [loading, setLoading] = useState(false);

    const { filteredRoleOptions, createEmployee } = useEmployees();
    const { showSnackbar } = useSnackbarContext();

    const groupedRoles = filteredRoleOptions.reduce((acc, role: { label: string; value: string; department?: string }) => {
        const department = role.department || 'Other';
        if (!acc[department]) acc[department] = [];
        acc[department].push(role);
        return acc;
    }, {} as Record<string, typeof filteredRoleOptions>);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'roleId' ? (value === '' ? null : value) : value,
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
            {fieldConfigs.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name as keyof EmployeeInputPayload]}
                    onChange={handleChange}
                    groupedRoles={field.type === 'role-select' ? groupedRoles : undefined}
                />
            ))}
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
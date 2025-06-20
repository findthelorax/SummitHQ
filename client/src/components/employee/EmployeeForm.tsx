import React, { useState } from 'react';
import { EMPLOYEE_STATUS, DEPARTMENT, EMPLOYEE_STATUS_LABELS, DEPARTMENT_LABELS } from '../../types/generated-enums';
import type { EmployeeInputPayload } from '../../api/EmployeeAPI';
import type { RoleDTO } from '../../types/index';
import { formatPhoneNumber, validateEmail } from '../../utils/common/formatData';
import { useMountain } from '../../contexts/MountainContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

type Props = {
    form: EmployeeInputPayload;
    roles: RoleDTO[];
    groupedRoles: Record<string, RoleDTO[]>;
    editingId: string | null;
    error: string | null;
    success: string | null;
    loading?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
};

export const EmployeeForm: React.FC<Props> = ({
    form,
    groupedRoles,
    editingId,
    error,
    success,
    loading,
    onChange,
    onSubmit,
    onCancel,
}) => {
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; phoneNumber?: string }>({});
    const { mountains, selectedMountain } = useMountain();
    const { showSnackbar } = useSnackbarContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber') {
            const digits = value.replace(/\D/g, '');
            const formatted = formatPhoneNumber(digits);
            onChange({
                ...e,
                target: {
                    ...e.target,
                    value: formatted,
                    name,
                },
            } as React.ChangeEvent<HTMLInputElement>);
        } else {
            onChange(e);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: typeof fieldErrors = {};
        if (form.email && !validateEmail(form.email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (form.phoneNumber && !/^\d{3}-\d{3}-\d{4}$/.test(form.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be in the format 123-456-7890.';
        }
        setFieldErrors(errors);
        if (Object.keys(errors).length === 0) {
            onSubmit(e);
        } else {
            Object.values(errors).forEach(msg => showSnackbar(msg, 'error'));
        }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const errors: typeof fieldErrors = { ...fieldErrors };

        if (name === 'email') {
            if (!value) {
                delete errors.email;
            } else if (!validateEmail(value)) {
                errors.email = 'Invalid email';
                showSnackbar('Invalid email', 'error');
            } else {
                delete errors.email;
            }
        }
        if (name === 'phoneNumber') {
            if (!value) {
                delete errors.phoneNumber;
            } else if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
                errors.phoneNumber = 'Phone number must be 123-456-7890.';
                showSnackbar('Phone number must be 123-456-7890.', 'error');
            } else {
                delete errors.phoneNumber;
            }
        }
        setFieldErrors(errors);
    };

    React.useEffect(() => {
        if (error) showSnackbar(error, 'error');
    }, [error, showSnackbar]);
    React.useEffect(() => {
        if (success) showSnackbar(success, 'success');
    }, [success, showSnackbar]);

    return (
        <div className="form-container">
            <form onSubmit={handleFormSubmit} className="form-row">
                {/* Row 1: First Name, Last Name, Email */}
                <div className="mb-4 grid gap-4 w-full" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
                    <div>
                        <label className="block mb-1 font-semibold">First Name</label>
                        <input
                            className="input"
                            name="firstName"
                            type="text"
                            value={form.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Last Name</label>
                        <input
                            className="input"
                            name="lastName"
                            type="text"
                            value={form.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            className="input"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                    </div>
                </div>
                {/* Row 2: Phone Number, Primary Department, Status */}
                <div className="mb-4 grid gap-4 w-full" style={{ gridTemplateColumns: '1fr 1fr 2fr 1fr' }}>
                    <div className="relative">
                        <label className="block mb-1 font-semibold">Phone Number</label>
                        <input
                            className="input"
                            name="phoneNumber"
                            type="text"
                            value={form.phoneNumber}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            inputMode="numeric"
                            maxLength={12}
                            pattern="\d{3}-\d{3}-\d{4}"
                            placeholder="123-456-7890"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Primary Department</label>
                        <select
                            className="dropdown"
                            name="primaryDepartment"
                            value={form.primaryDepartment ?? ''}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Department</option>
                            {Object.entries(DEPARTMENT_LABELS).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Role</label>
                        <select
                            className="dropdown"
                            name="roleId"
                            value={form.roleId ?? ''}
                            onChange={handleInputChange}
                            required
                            disabled={!form.primaryDepartment}
                        >
                            <option value="">Select Role</option>
                            {form.primaryDepartment &&
                                groupedRoles[form.primaryDepartment] &&
                                groupedRoles[form.primaryDepartment].map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.title} {role.position ? `- ${role.position}` : ''}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Status</label>
                        <select
                            className="dropdown"
                            name="status"
                            value={form.status}
                            onChange={handleInputChange}
                            required
                        >
                            {Object.entries(EMPLOYEE_STATUS_LABELS).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-4 grid gap-4 w-full" style={{ gridTemplateColumns: '1fr' }}>
                    <label className="block mb-1 font-semibold">Assigned Mountain</label>
                    <select
                        className="dropdown"
                        name="mountainId"
                        value={selectedMountain ? selectedMountain.id : form.mountainId ?? ''}
                        onChange={handleInputChange}
                        disabled={!!selectedMountain}
                        required
                    >
                        <option value="">Select Mountain</option>
                        {mountains.map((mtn) => (
                            <option key={mtn.id} value={mtn.id}>
                                {mtn.name} ({mtn.city}, {mtn.state})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-button-center">
                    <button type="submit" className="button-primary form-button-quarter" disabled={loading}>
                        {editingId ? 'Update' : 'Add Employee'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={onCancel} className="button-secondary form-button-quarter">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
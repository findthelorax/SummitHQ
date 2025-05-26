import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useLodges } from '../../hooks/useLodges';
import { STATUS } from 'shared/types/enums';
import { STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import type { LodgeInputPayload } from '../../api/LodgeAPI';

const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

const getEmptyForm = (): LodgeInputPayload => ({
    name: '',
    capacity: 0,
    latitude: null,
    longitude: null,
    status: STATUS.UNKNOWN,
});

const fieldConfigs = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Capacity', name: 'capacity', type: 'number', required: true },
    {
        label: 'Status',
        name: 'status',
        type: 'select',
        required: true,
        options: STATUS_OPTIONS,
    },
    { label: 'Latitude', name: 'latitude', type: 'number', required: false, placeholder: '(optional)', step: 'any' },
    { label: 'Longitude', name: 'longitude', type: 'number', required: false, placeholder: '(optional)', step: 'any' },
];

const FormField = ({
    field,
    value,
    onChange,
}: {
    field: any;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
}) => {
    if (field.type === 'select') {
        return (
            <div className="mb-4">
                <label className="block mb-1 font-semibold">{field.label}</label>
                <select
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    required={field.required}
                    className="dropdown"
                >
                    {field.options.map((opt: any) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
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
                value={value ?? ''}
                onChange={onChange}
                required={field.required}
                className="w-full border rounded px-3 py-2"
                placeholder={field.placeholder}
                step={field.step}
            />
        </div>
    );
};

interface LodgeFormProps {
    onCreated?: () => void;
}

const LodgeForm: React.FC<LodgeFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createLodge } = useLodges(selectedMountain?.id);
    const [form, setForm] = useState<LodgeInputPayload>(getEmptyForm());
    const { showSnackbar } = useSnackbarContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'number' || name === 'capacity' || name === 'latitude' || name === 'longitude'
                    ? value === ''
                        ? name === 'capacity'
                            ? 0
                            : null
                        : Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedMountain) {
            showSnackbar('Please select a mountain first.', 'error');
            return;
        }
        if (form.capacity === null) {
            showSnackbar('Capacity is required.', 'error');
            return;
        }
        try {
            await createLodge({ ...form, capacity: form.capacity });
            showSnackbar(`${form.name} lodge created successfully`, 'success');
            setForm(getEmptyForm());
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating lodge', 'error');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {fieldConfigs.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name as keyof LodgeInputPayload]}
                    onChange={handleChange}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!selectedMountain}
            >
                Add Lodge
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add a lodge.</div>
            )}
        </form>
    );
};

export default LodgeForm;
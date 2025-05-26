import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useLifts } from '../../hooks/useLifts';
import { LIFT_TYPE, STATUS } from 'shared/types/enums';
import { LIFT_TYPE_LABELS, STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import type { LiftInputPayload } from '../../api/LiftAPI';

const LIFT_TYPE_OPTIONS = enumToOptions(LIFT_TYPE, LIFT_TYPE_LABELS);
const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

const getEmptyLiftForm = (): LiftInputPayload => ({
    name: '',
    type: LIFT_TYPE.CHAIR,
    status: STATUS.UNKNOWN,
    capacity: 0,
    latitude: null,
    longitude: null,
    locationId: '',
});

const fieldConfigs = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    {
        label: 'Type',
        name: 'type',
        type: 'select',
        required: true,
        options: LIFT_TYPE_OPTIONS,
    },
    {
        label: 'Status',
        name: 'status',
        type: 'select',
        required: true,
        options: STATUS_OPTIONS,
    },
    { label: 'Capacity', name: 'capacity', type: 'number', required: true },
    { label: 'Latitude', name: 'latitude', type: 'number', required: false, placeholder: '(optional)', step: 'any' },
    { label: 'Longitude', name: 'longitude', type: 'number', required: false, placeholder: '(optional)', step: 'any' },
    { label: 'Location ID', name: 'locationId', type: 'text', required: false, placeholder: '(optional)' },
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

interface LiftFormProps {
    onCreated?: () => void;
}

const LiftForm: React.FC<LiftFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createLift } = useLifts(selectedMountain?.id);
    const { showSnackbar } = useSnackbarContext();

    const [form, setForm] = useState<LiftInputPayload>(getEmptyLiftForm());
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        setLoading(true);
        try {
            await createLift(form);
            showSnackbar(`${form.name} lift created successfully`, 'success');
            setForm(getEmptyLiftForm());
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating lift', 'error');
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
                    value={form[field.name as keyof LiftInputPayload]}
                    onChange={handleInputChange}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!selectedMountain || loading}
            >
                {loading ? 'Adding...' : 'Add Lift'}
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add a lift.</div>
            )}
        </form>
    );
};

export default LiftForm;
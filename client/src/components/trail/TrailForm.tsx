import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useTrails } from '../../hooks/useTrails';
import { TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION } from 'shared/types/enums';
import {
    TRAIL_DIFFICULTY_LABELS,
    STATUS_LABELS,
    TRAIL_CONDITION_LABELS,
    enumToOptions,
} from 'shared/types/utils/enumLabels';
import type { TrailInputPayload } from '../../api/TrailAPI';

const TRAIL_DIFFICULTY_OPTIONS = enumToOptions(TRAIL_DIFFICULTY, TRAIL_DIFFICULTY_LABELS);
const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);
const TRAIL_CONDITION_OPTIONS = enumToOptions(TRAIL_CONDITION, TRAIL_CONDITION_LABELS);

const fieldConfigs = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    {
        label: 'Difficulty',
        name: 'difficulty',
        type: 'select',
        required: true,
        options: TRAIL_DIFFICULTY_OPTIONS,
    },
    {
        label: 'Status',
        name: 'status',
        type: 'select',
        required: true,
        options: STATUS_OPTIONS,
    },
    {
        label: 'Condition',
        name: 'condition',
        type: 'select',
        required: true,
        options: TRAIL_CONDITION_OPTIONS,
    },
    { label: 'Length (miles)', name: 'length', type: 'number', required: true, step: 'any' },
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

interface TrailFormProps {
    onCreated?: () => void;
}

const TrailForm: React.FC<TrailFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createTrail } = useTrails(selectedMountain?.id);
    const [form, setForm] = useState<TrailInputPayload>({
        name: '',
        difficulty: TRAIL_DIFFICULTY.OTHER,
        status: STATUS.UNKNOWN,
        length: null,
        latitude: null,
        longitude: null,
        condition: TRAIL_CONDITION.CLOSED,
    });
    const { showSnackbar } = useSnackbarContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? null : Number(value)) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedMountain) {
            showSnackbar('Please select a mountain first.', 'error');
            return;
        }
        try {
            await createTrail(form);
            showSnackbar(`${form.name} trail created successfully`, 'success');
            setForm({
                name: '',
                difficulty: TRAIL_DIFFICULTY.OTHER,
                status: STATUS.UNKNOWN,
                length: null,
                latitude: null,
                longitude: null,
                condition: TRAIL_CONDITION.CLOSED,
            });
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating trail', 'error');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {fieldConfigs.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name as keyof TrailInputPayload]}
                    onChange={handleChange}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!selectedMountain}
            >
                Add Trail
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add a trail.</div>
            )}
        </form>
    );
};

export default TrailForm;
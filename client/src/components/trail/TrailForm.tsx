import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useTrails } from '../../hooks/trail/useTrails';
import {
    TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION,
    TRAIL_DIFFICULTY_LABELS,
    STATUS_LABELS,
    TRAIL_CONDITION_LABELS,
    enumToOptions,
} from '../../types/generated-enums';
import type { TrailInputPayload } from '../../api/TrailAPI';

const TRAIL_DIFFICULTY_OPTIONS = enumToOptions(TRAIL_DIFFICULTY, TRAIL_DIFFICULTY_LABELS);
const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);
const TRAIL_CONDITION_OPTIONS = enumToOptions(TRAIL_CONDITION, TRAIL_CONDITION_LABELS);

const getEmptyForm = (): TrailInputPayload => ({
    name: '',
    difficulty: TRAIL_DIFFICULTY.OTHER,
    status: STATUS.CLOSED,
    length: 0,
    latitude: null,
    longitude: null,
    condition: TRAIL_CONDITION.NATURAL,
});

const fields = [
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
            <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
                type={field.type}
                name={field.name}
                value={value ?? ''}
                onChange={onChange}
                required={field.required}
                className="input"
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
    const [form, setForm] = useState<TrailInputPayload>(getEmptyForm());
    const { showSnackbar } = useSnackbarContext();

    useEffect(() => {
        setForm(getEmptyForm());
    }, []);

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
            setForm(getEmptyForm());
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error saving trail', 'error');
        }
    };

    const fieldRows = [
        [fields[0], fields[1], fields[2]], // Name, Difficulty, Status
        [fields[3], fields[4], fields[5], fields[6]], // Condition, Length, Latitude, Longitude
    ];

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {fieldRows.map((row, rowIdx) => (
                <div
                    key={rowIdx}
                    className="mb-4 grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
                >
                    {row.map((field) => (
                        <FormField
                            key={field.name}
                            field={field}
                            value={form[field.name as keyof TrailInputPayload]}
                            onChange={handleChange}
                        />
                    ))}
                </div>
            ))}
            <div className="form-button-center">
                <button type="submit" className="button-primary form-button-quarter" disabled={!selectedMountain}>
                    Add Trail
                </button>
            </div>
            {!selectedMountain && (
                <div className="text-error text-center mt-2">Please select a mountain to add a trail.</div>
            )}
        </form>
    );
};

export default TrailForm;
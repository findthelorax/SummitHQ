import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useHuts } from '../../hooks/useHuts';
import { STATUS } from 'shared/types/enums';
import { STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import type { HutInputPayload } from '../../api/HutAPI';

const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

interface HutFormProps {
    onCreated?: () => void;
}

const emptyForm: HutInputPayload = {
    name: '',
    status: STATUS.UNKNOWN,
    latitude: null,
    longitude: null,
};

const fieldConfigs = [
    { label: 'Name', name: 'name', type: 'text', required: true },
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

const HutForm: React.FC<HutFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createHut } = useHuts(selectedMountain?.id);
    const [form, setForm] = useState<HutInputPayload>(emptyForm);
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
            await createHut(form);
            showSnackbar(`${form.name} hut created successfully`, 'success');
            setForm(emptyForm);
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating hut', 'error');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {fieldConfigs.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name as keyof HutInputPayload]}
                    onChange={handleChange}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!selectedMountain}
            >
                Add Hut
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">
                    Please select a mountain to add a hut.
                </div>
            )}
        </form>
    );
};

export default HutForm;
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useAreas } from '../../hooks/useAreas';
import { AREA_TYPE } from 'shared/types/enums';
import { AREA_TYPE_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import type { AreaInputPayload } from '../../api/AreaAPI';

const AREA_TYPE_OPTIONS = enumToOptions(AREA_TYPE, AREA_TYPE_LABELS);

interface AreaFormProps {
    onCreated?: () => void;
}

const emptyForm: AreaInputPayload = {
    name: '',
    type: AREA_TYPE.BASE_AREA,
    description: '',
};

const fields = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        required: true,
    },
    {
        label: 'Type',
        name: 'type',
        type: 'select',
        required: true,
        options: AREA_TYPE_OPTIONS,
    },
    {
        label: 'Description',
        name: 'description',
        type: 'textarea',
        required: false,
    },
];

const FormField = ({ field, value, onChange }: any) => {
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
    if (field.type === 'textarea') {
        return (
            <div className="mb-4">
                <label className="block mb-1 font-semibold">{field.label}</label>
                <textarea
                    name={field.name}
                    value={value ?? ''}
                    onChange={onChange}
                    className="w-full border rounded px-3 py-2"
                />
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
            />
        </div>
    );
};

const AreaForm: React.FC<AreaFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createArea } = useAreas(selectedMountain?.id);
    const [form, setForm] = useState<AreaInputPayload>(emptyForm);
    const { showSnackbar } = useSnackbarContext();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedMountain) {
            showSnackbar('Please select a mountain first.', 'error');
            return;
        }
        try {
            await createArea(form);
            setForm(emptyForm);
            showSnackbar(`${form.name} area created successfully`, 'success');
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating area', 'error');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            {fields.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    value={form[field.name as keyof AreaInputPayload]}
                    onChange={handleChange}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!selectedMountain}
            >
                Add Area
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">
                    Please select a mountain to add an area.
                </div>
            )}
        </form>
    );
};

export default AreaForm;
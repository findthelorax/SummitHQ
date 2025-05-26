import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { EQUIPMENT_STATUS } from 'shared/types/enums';
import { EQUIPMENT_STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import { useMountain } from '../../contexts/MountainContext';
import { useEquipment } from '../../hooks/useEquipment';
import type { EquipmentInputPayload } from '../../api/EquipmentAPI';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

const EQUIPMENT_STATUS_OPTIONS = enumToOptions(EQUIPMENT_STATUS, EQUIPMENT_STATUS_LABELS);

const emptyForm: EquipmentInputPayload = {
    name: '',
    type: '',
    number: undefined,
    description: '',
    status: EQUIPMENT_STATUS.OPERATIONAL,
    picture: '',
    cost: undefined,
    latitude: null,
    longitude: null,
};

const fieldConfigs = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Type', name: 'type', type: 'text', required: false },
    { label: 'Number', name: 'number', type: 'number', required: false, placeholder: '(optional)' },
    {
        label: 'Status',
        name: 'status',
        type: 'select',
        required: true,
        options: EQUIPMENT_STATUS_OPTIONS,
    },
    { label: 'Description', name: 'description', type: 'text', required: false, placeholder: '(optional)' },
    { label: 'Picture URL', name: 'picture', type: 'text', required: false, placeholder: '(optional)' },
    { label: 'Cost', name: 'cost', type: 'number', required: false, placeholder: '(optional)' },
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
                    className="dropdown"
                    required={field.required}
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

const EquipmentForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createEquipment } = useEquipment(selectedMountain?.id);
    const [form, setForm] = useState<EquipmentInputPayload>(emptyForm);
    const [loading, setLoading] = useState(false);
    const { showSnackbar } = useSnackbarContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'number' || name === 'latitude' || name === 'longitude' || name === 'cost' || name === 'number'
                    ? value === ''
                        ? undefined
                        : Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload: EquipmentInputPayload = {
                ...form,
                ...(selectedMountain?.id ? { mountainId: selectedMountain.id } : {}),
            };
            if (payload.mountainId === '') delete payload.mountainId;
            await createEquipment(payload);
            setForm(emptyForm);
            showSnackbar('Equipment added successfully!', 'success');
            if (onCreated) onCreated();
        } catch (err) {
            showSnackbar('Error adding equipment', 'error');
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
                    value={form[field.name as keyof EquipmentInputPayload]}
                    onChange={handleChange}
                />
            ))}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Equipment'}
            </button>
        </form>
    );
};

export default EquipmentForm;
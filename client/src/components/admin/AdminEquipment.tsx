import React, { useEffect, useState } from 'react';
import { equipmentApi, EquipmentInputPayload } from '../../api/EquipmentAPI';
import type { Equipment } from 'shared/types';
import { EQUIPMENT_STATUS } from 'shared/types/enums';
import { EQUIPMENT_STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';

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
    mountainId: '',
    locationId: null,
};

const fields = [
    { name: 'name', type: 'text', required: true, placeholder: 'Name' },
    { name: 'type', type: 'text', required: false, placeholder: 'Type' },
    { name: 'number', type: 'number', required: false, placeholder: 'Number' },
    { name: 'description', type: 'text', required: false, placeholder: 'Description' },
    { name: 'picture', type: 'text', required: false, placeholder: 'Picture URL' },
    { name: 'cost', type: 'number', required: false, placeholder: 'Cost' },
    { name: 'latitude', type: 'number', required: false, placeholder: 'Latitude' },
    { name: 'longitude', type: 'number', required: false, placeholder: 'Longitude' },
    { name: 'mountainId', type: 'text', required: false, placeholder: 'Mountain ID' },
    { name: 'locationId', type: 'text', required: false, placeholder: 'Location ID' },
];

const AdminEquipment: React.FC = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<EquipmentInputPayload>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchEquipment = async () => {
        setIsLoading(true);
        try {
            const data = await equipmentApi.getAllEquipment();
            setEquipment(data);
        } catch {
            setError('Failed to fetch equipment');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                value === ''
                    ? ''
                    : type === 'number'
                    ? Number(value)
                    : name === 'latitude' || name === 'longitude' || name === 'cost' || name === 'number'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (editingId) {
                await equipmentApi.updateEquipment(editingId, form);
            } else {
                await equipmentApi.createEquipment(form);
            }
            setForm(emptyForm);
            setEditingId(null);
            await fetchEquipment();
        } catch {
            setError('Failed to save equipment');
        }
    };

    const handleEdit = (item: Equipment) => {
        setEditingId(item.id);
        setForm({
            name: item.name || '',
            type: item.type || '',
            number: item.number ?? undefined,
            description: item.description || '',
            status: item.status || EQUIPMENT_STATUS.OPERATIONAL,
            picture: item.picture || '',
            cost: item.cost ?? undefined,
            latitude: item.latitude !== null && item.latitude !== undefined ? Number(item.latitude) : null,
            longitude: item.longitude !== null && item.longitude !== undefined ? Number(item.longitude) : null,
            mountainId: item.mountainId || '',
            locationId: item.locationId ?? null,
        });
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this equipment?')) return;
        setError(null);
        try {
            await equipmentApi.deleteEquipment(id);
            await fetchEquipment();
        } catch {
            setError('Failed to delete equipment');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">All Equipment</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-4"
            >
                {fields.map((field) => (
                    <input
                        key={field.name}
                        className="border p-2 rounded flex-1"
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={form[field.name as keyof EquipmentInputPayload] ?? ''}
                        onChange={handleChange}
                        required={field.required}
                    />
                ))}
                <select className="dropdown" name="status" value={form.status} onChange={handleChange}>
                    {EQUIPMENT_STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="flex gap-2 mt-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {editingId ? 'Update' : 'Add'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="divide-y divide-gray-300">
                    {equipment.map((item) => (
                        <li key={item.id} className="flex items-center justify-between py-2">
                            <span>
                                <span className="font-semibold">{item.name}</span>
                                {item.type && `, ${item.type}`}
                                {item.status && `, ${item.status}`}
                            </span>
                            <span className="flex gap-2">
                                <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminEquipment;
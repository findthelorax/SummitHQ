import React, { useEffect, useState } from 'react';
import { equipmentApi } from '../../api/EquipmentAPI';
import type { Equipment } from 'shared/types';
import { EQUIPMENT_STATUS } from 'shared/types/enums';

type EquipmentInputPayload = {
    name: string;
    type: string;
    number?: number;
    description?: string;
    status?: string;
    picture?: string;
    cost?: number;
    latitude?: number | null;
    longitude?: number | null;
    mountainId?: string;
    locationId?: string | null;
};

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
        } catch (e) {
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
            [name]: value === '' ? '' :
                type === 'number' ? Number(value) :
                name === 'latitude' || name === 'longitude' || name === 'cost' || name === 'number'
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
        } catch (e) {
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
        } catch (e) {
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
            <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-4">
                <input
                    className="border p-2 rounded flex-1"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="type"
                    placeholder="Type"
                    value={form.type}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="number"
                    placeholder="Number"
                    type="number"
                    value={form.number ?? ''}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <select
                    className="border p-2 rounded flex-1"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    {Object.values(EQUIPMENT_STATUS).map((status) => (
                        <option key={status} value={status}>
                            {status.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
                <input
                    className="border p-2 rounded flex-1"
                    name="picture"
                    placeholder="Picture URL"
                    value={form.picture}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="cost"
                    placeholder="Cost"
                    type="number"
                    value={form.cost ?? ''}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="latitude"
                    placeholder="Latitude"
                    type="number"
                    value={form.latitude ?? ''}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="longitude"
                    placeholder="Longitude"
                    type="number"
                    value={form.longitude ?? ''}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="mountainId"
                    placeholder="Mountain ID"
                    value={form.mountainId ?? ''}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="locationId"
                    placeholder="Location ID"
                    value={form.locationId ?? ''}
                    onChange={handleChange}
                />
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
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:underline"
                                >
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
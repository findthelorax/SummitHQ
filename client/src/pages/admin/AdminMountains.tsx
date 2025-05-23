import React, { useEffect, useState } from 'react';
import { mountainApi } from '../../api/MountainAPI';
import type { Mountain } from 'shared/types';

type MountainInputPayload = {
    name: string;
    city: string;
    state: string;
    latitude: number | null;
    longitude: number | null;
    height: number | null;
    phoneNumber?: string;
    address?: string;
    zipcode?: string;
    openingDate?: string;
    closingDate?: string;
};

const emptyForm: MountainInputPayload = {
    name: '',
    city: '',
    state: '',
    latitude: null,
    longitude: null,
    height: null,
    phoneNumber: '',
    address: '',
    zipcode: '',
    openingDate: '',
    closingDate: '',
};

const AdminMountains: React.FC = () => {
    const [mountains, setMountains] = useState<Mountain[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState<MountainInputPayload>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchMountains = async () => {
        setIsLoading(true);
        try {
            const data = await mountainApi.getAllMountains();
            setMountains(data);
        } catch (e) {
            setError('Failed to fetch mountains');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMountains();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value === '' ? '' : name === 'latitude' || name === 'longitude' || name === 'height'
                ? Number(value)
                : value,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        try {
            if (editingId) {
                // Convert latitude and longitude to Decimal if needed
                const toDecimal = (value: number | null) =>
                    value !== null && value !== undefined
                        ? (window as any).Decimal ? new (window as any).Decimal(value) : value
                        : null;
                const updatedForm = {
                    ...form,
                    latitude: toDecimal(form.latitude),
                    longitude: toDecimal(form.longitude),
                    height: form.height !== null && form.height !== undefined ? form.height : undefined,
                    openingDate: form.openingDate
                        ? new Date(form.openingDate)
                        : null,
                    closingDate: form.closingDate
                        ? new Date(form.closingDate)
                        : null,
                };
                await mountainApi.updateMountain(editingId, updatedForm);
            } else {
                await mountainApi.createMountain(form);
            }
            setForm(emptyForm);
            setEditingId(null);
            await fetchMountains();
        } catch (e) {
            setError('Failed to save mountain');
        }
    };

    const handleEdit = (mountain: Mountain) => {
        setEditingId(mountain.id);
        setForm({
            name: mountain.name || '',
            city: mountain.city || '',
            state: mountain.state || '',
            latitude: mountain.latitude !== null && mountain.latitude !== undefined
                ? Number(mountain.latitude)
                : null,
            longitude: mountain.longitude !== null && mountain.longitude !== undefined
                ? Number(mountain.longitude)
                : null,
            height: mountain.height !== null && mountain.height !== undefined
                ? Number(mountain.height)
                : null,
            phoneNumber: mountain.phoneNumber || '',
            address: mountain.address || '',
            zipcode: mountain.zipcode || '',
            openingDate: mountain.openingDate
                ? typeof mountain.openingDate === 'string'
                    ? mountain.openingDate
                    : (mountain.openingDate as Date).toISOString().slice(0, 10)
                : '',
            closingDate: mountain.closingDate
                ? typeof mountain.closingDate === 'string'
                    ? mountain.closingDate
                    : (mountain.closingDate as Date).toISOString().slice(0, 10)
                : '',
        });
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this mountain?')) return;
        setError(null);
        try {
            await mountainApi.deleteMountain(id);
            await fetchMountains();
        } catch (e) {
            setError('Failed to delete mountain');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm(emptyForm);
        setError(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">All Mountains</h2>
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
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="state"
                    placeholder="State"
                    value={form.state}
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
                    name="height"
                    placeholder="Height"
                    type="number"
                    value={form.height ?? ''}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={form.phoneNumber}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="zipcode"
                    placeholder="Zipcode"
                    value={form.zipcode}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="openingDate"
                    placeholder="Opening Date"
                    type="date"
                    value={form.openingDate || ''}
                    onChange={handleChange}
                />
                <input
                    className="border p-2 rounded flex-1"
                    name="closingDate"
                    placeholder="Closing Date"
                    type="date"
                    value={form.closingDate || ''}
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
                    {mountains.map((m) => (
                        <li key={m.id} className="flex items-center justify-between py-2">
                            <span>
                                <span className="font-semibold">{m.name}</span>
                                {m.city && `, ${m.city}`}
                                {m.state && `, ${m.state}`}
                            </span>
                            <span className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(m)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(m.id)}
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

export default AdminMountains;
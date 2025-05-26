import React, { useEffect, useState } from 'react';
import { mountainApi } from '../../api/MountainAPI';
import type { Mountain } from 'shared/types';
import MountainForm from '../mountain/MountainForm';

const AdminMountains: React.FC = () => {
    const [mountains, setMountains] = useState<Mountain[]>([]);
    const [editingMountain, setEditingMountain] = useState<{ id: string; data: any } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
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

    const handleEdit = (mountain: Mountain) => {
        setEditingMountain({
            id: mountain.id,
            data: {
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
            }
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
        setEditingMountain(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">All Mountains</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <MountainForm
                initial={editingMountain ? editingMountain.data : undefined}
                editingId={editingMountain ? editingMountain.id : undefined}
                onSuccess={() => {
                    setEditingMountain(null);
                    fetchMountains();
                }}
                onCancel={handleCancel}
            />
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
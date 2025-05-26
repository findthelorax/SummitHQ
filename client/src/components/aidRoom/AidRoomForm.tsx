import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useAidRooms } from '../../hooks/useAidRooms';
import { STATUS } from 'shared/types/enums';
import { STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import type { AidRoomInputPayload } from '../../api/AidRoomAPI';

const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

interface AidRoomFormProps {
    onCreated?: () => void;
}

const AidRoomForm: React.FC<AidRoomFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createAidRoom } = useAidRooms(selectedMountain?.id);
    const [form, setForm] = useState<AidRoomInputPayload>({
        name: '',
        status: STATUS.UNKNOWN,
        latitude: null,
        longitude: null,
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
            await createAidRoom(form);
            showSnackbar(`${form.name} aid room created successfully`, 'success');
            setForm({
                name: '',
                status: STATUS.UNKNOWN,
                latitude: null,
                longitude: null,
            });
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating aid room', 'error');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Status</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                    className="dropdown"
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Latitude</label>
                <input
                    type="number"
                    name="latitude"
                    value={form.latitude ?? ''}
                    onChange={handleChange}
                    step="any"
                    className="w-full border rounded px-3 py-2"
                    placeholder="(optional)"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Longitude</label>
                <input
                    type="number"
                    name="longitude"
                    value={form.longitude ?? ''}
                    onChange={handleChange}
                    step="any"
                    className="w-full border rounded px-3 py-2"
                    placeholder="(optional)"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!selectedMountain}
            >
                Add Aid Room
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add an aid room.</div>
            )}
        </form>
    );
};

export default AidRoomForm;
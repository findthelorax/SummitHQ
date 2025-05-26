import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useLodges } from '../../hooks/useLodges';
import { STATUS } from 'shared/types/enums';
import { STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import type { LodgeInputPayload } from '../../api/LodgeAPI';

const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

interface LodgeFormProps {
    onCreated?: () => void;
}

const LodgeForm: React.FC<LodgeFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createLodge } = useLodges(selectedMountain?.id);
    const [form, setForm] = useState<LodgeInputPayload>({
        name: '',
        capacity: 0,
        latitude: null,
        longitude: null,
        status: STATUS.UNKNOWN,
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
            if (form.capacity === null) {
                showSnackbar('Capacity is required.', 'error');
                return;
            }
            await createLodge({ ...form, capacity: form.capacity });
            showSnackbar(`${form.name} lodge created successfully`, 'success');
            setForm({
                name: '',
                capacity: 0,
                latitude: null,
                longitude: null,
                status: STATUS.UNKNOWN,
            });
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating lodge', 'error');
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
                <label className="block mb-1 font-semibold">Capacity</label>
                <input
                    type="number"
                    name="capacity"
                    value={form.capacity ?? ''}
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
                Add Lodge
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add a lodge.</div>
            )}
        </form>
    );
};

export default LodgeForm;
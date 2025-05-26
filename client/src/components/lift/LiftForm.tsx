import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useLifts } from '../../hooks/useLifts';
import { LIFT_TYPE, STATUS } from 'shared/types/enums';
import {
    LIFT_TYPE_LABELS,
    STATUS_LABELS,
    enumToOptions,
} from 'shared/types/utils/enumLabels';
import type { LiftInputPayload } from '../../api/LiftAPI';

const LIFT_TYPE_OPTIONS = enumToOptions(LIFT_TYPE, LIFT_TYPE_LABELS);
const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

const getEmptyLiftForm = (): LiftInputPayload => ({
    name: '',
    type: LIFT_TYPE.CHAIR,
    status: STATUS.UNKNOWN,
    capacity: 0,
    latitude: null,
    longitude: null,
    locationId: '',
});

interface LiftFormProps {
    onCreated?: () => void;
}

const LiftForm: React.FC<LiftFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createLift } = useLifts(selectedMountain?.id);
    const { showSnackbar } = useSnackbarContext();

    const [form, setForm] = useState<LiftInputPayload>(getEmptyLiftForm());
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'number' || name === 'capacity'
                    ? value === ''
                        ? 0
                        : Number(value)
                    : name === 'latitude' || name === 'longitude'
                    ? value === ''
                        ? null
                        : Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!selectedMountain) {
            showSnackbar('Please select a mountain first.', 'error');
            return;
        }
        setLoading(true);
        try {
            await createLift(form);
            showSnackbar(`${form.name} lift created successfully`, 'success');
            setForm(getEmptyLiftForm());
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating lift', 'error');
        } finally {
            setLoading(false);
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
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Type</label>
                <select
                    name="type"
                    value={form.type}
                    onChange={handleInputChange}
                    required
                    className="dropdown"
                >
                    {LIFT_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Status</label>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleInputChange}
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
                <label className="block mb-1 font-semibold">Capacity</label>
                <input
                    type="number"
                    name="capacity"
                    value={form.capacity ?? ''}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Latitude</label>
                <input
                    type="number"
                    name="latitude"
                    value={form.latitude ?? ''}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    step="any"
                    className="w-full border rounded px-3 py-2"
                    placeholder="(optional)"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Location ID</label>
                <input
                    type="text"
                    name="locationId"
                    value={form.locationId}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    placeholder="(optional)"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={!selectedMountain || loading}
            >
                {loading ? 'Adding...' : 'Add Lift'}
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add a lift.</div>
            )}
        </form>
    );
};

export default LiftForm;
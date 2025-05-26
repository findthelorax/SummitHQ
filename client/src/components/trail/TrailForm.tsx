import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useTrails } from '../../hooks/useTrails';
import { TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION } from 'shared/types/enums';
import {
    TRAIL_DIFFICULTY_LABELS,
    STATUS_LABELS,
    TRAIL_CONDITION_LABELS,
    enumToOptions,
} from 'shared/types/utils/enumLabels';
import type { TrailInputPayload } from '../../api/TrailAPI';

const TRAIL_DIFFICULTY_OPTIONS = enumToOptions(TRAIL_DIFFICULTY, TRAIL_DIFFICULTY_LABELS);
const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);
const TRAIL_CONDITION_OPTIONS = enumToOptions(TRAIL_CONDITION, TRAIL_CONDITION_LABELS);

interface TrailFormProps {
    onCreated?: () => void;
}

const TrailForm: React.FC<TrailFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createTrail } = useTrails(selectedMountain?.id);
    const [form, setForm] = useState<TrailInputPayload>({
        name: '',
        difficulty: TRAIL_DIFFICULTY.OTHER,
        status: STATUS.UNKNOWN,
        length: null,
        latitude: null,
        longitude: null,
        condition: TRAIL_CONDITION.CLOSED,
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
            await createTrail(form);
            showSnackbar(`${form.name} trail created successfully`, 'success');
            setForm({
                name: '',
                difficulty: TRAIL_DIFFICULTY.OTHER,
                status: STATUS.UNKNOWN,
                length: null,
                latitude: null,
                longitude: null,
                condition: TRAIL_CONDITION.CLOSED,
            });
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating trail', 'error');
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
                <label className="block mb-1 font-semibold">Difficulty</label>
                <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    required
                    className="dropdown"
                >
                    {TRAIL_DIFFICULTY_OPTIONS.map((opt) => (
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
                <label className="block mb-1 font-semibold">Condition</label>
                <select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    required
                    className="dropdown"
                >
                    {TRAIL_CONDITION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Length (miles)</label>
                <input
                    type="number"
                    name="length"
                    value={form.length ?? ''}
                    onChange={handleChange}
                    step="any"
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
                Add Trail
            </button>
            {!selectedMountain && (
                <div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add a trail.</div>
            )}
        </form>
    );
};

export default TrailForm;
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { AREA_TYPE } from 'shared/types/enums';
import { useMountain } from '../../contexts/MountainContext';
import { useAreas } from '../../hooks/useAreas';

const formatLabel = (value: string) => {
    const labelMap: Record<string, string> = {
        BASE_AREA: 'Base Area',
        MOUNTAIN_AREA: 'Mountain Area',
        SUMMIT: 'Summit',
        OTHER: 'Other',
    };
    return labelMap[value] ?? value;
};

const enumToOptions = (e: Record<string, string>) =>
    Object.entries(e).map(([_, value]) => ({
        value,
        label: formatLabel(value),
    }));

const AREA_TYPE_OPTIONS = enumToOptions(AREA_TYPE);

type AreaInput = {
    name: string;
    type: (typeof AREA_TYPE)[keyof typeof AREA_TYPE];
    description?: string;
};

interface AreaFormProps {
    onCreated?: () => void;
}

const AreaForm: React.FC<AreaFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createArea } = useAreas(selectedMountain?.id);
    const [form, setForm] = useState<AreaInput>({
        name: '',
        type: AREA_TYPE.BASE_AREA,
        description: '',
    });
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
            setForm({ name: '', type: AREA_TYPE.BASE_AREA, description: '' });
            showSnackbar(`${form.name} area created successfully`, 'success');
            if (onCreated) onCreated();
        } catch (error) {
            showSnackbar('Error creating area', 'error');
        }
    };

    return (
        <form className="bg-white dark:bg-gray-800 rounded shadow p-6 max-w-md mx-auto" onSubmit={handleSubmit}>
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
                <label className="block mb-1 font-semibold">Type</label>
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2 dark:bg-gray-700"
                >
                    {AREA_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
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
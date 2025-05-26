import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useAreas } from '../../hooks/useAreas';
import { AREA_TYPE } from 'shared/types/enums';
import { AREA_TYPE_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import type { AreaInputPayload } from '../../api/AreaAPI';

const AREA_TYPE_OPTIONS = enumToOptions(AREA_TYPE, AREA_TYPE_LABELS);

interface AreaFormProps {
    onCreated?: () => void;
}

const AreaForm: React.FC<AreaFormProps> = ({ onCreated }) => {
    const { selectedMountain } = useMountain();
    const { createArea } = useAreas(selectedMountain?.id);
    const [form, setForm] = useState<AreaInputPayload>({
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
                <label className="block mb-1 font-semibold">Type</label>
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="dropdown"
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
                    value={form.description ?? ''}
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
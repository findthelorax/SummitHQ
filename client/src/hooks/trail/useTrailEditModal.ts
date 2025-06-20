import { useState } from 'react';
import type { TrailDTO } from '../../types/index';

export function useTrailEditModal(updateTrail: (id: string, data: Partial<TrailDTO>) => Promise<TrailDTO>) {
    const [editingTrail, setEditingTrail] = useState<TrailDTO | null>(null);
    const [editForm, setEditForm] = useState<Partial<TrailDTO>>({});

    const handleEditTrail = (trail: TrailDTO) => {
        setEditingTrail(trail);
        setEditForm(trail);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (editingTrail) {
            await updateTrail(editingTrail.id, editForm);
            setEditingTrail(null);
        }
    };

    const handleCancel = () => setEditingTrail(null);

    return {
        editingTrail,
        editForm,
        handleEditTrail,
        handleChange,
        handleSave,
        handleCancel,
    };
}
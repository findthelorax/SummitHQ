import React from 'react';
import type { TrailDTO } from '../../types/index';

interface TrailEditModalProps {
    editingTrail: TrailDTO | null;
    editForm: Partial<TrailDTO>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const TrailEditModal: React.FC<TrailEditModalProps> = ({
    editingTrail,
    editForm,
    onChange,
    onSave,
    onCancel,
}) => {
    if (!editingTrail) return null;
    return (
        <div className="modal">
            <h2>Edit TrailDTO</h2>
            <input
                name="name"
                value={editForm.name || ''}
                onChange={onChange}
                placeholder="TrailDTO Name"
            />
            {/* Add more fields as needed */}
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default TrailEditModal;
// InlineSelectAddLocation.tsx
import React, { useState } from 'react';

interface InlineSelectAddLocationProps {
    areaId: string;
    availableLocations: { id: string; name: string }[];
    onAdd: (locationId: string) => void;
}

const InlineSelectAddLocation: React.FC<InlineSelectAddLocationProps> = ({
    areaId,
    availableLocations,
    onAdd,
}) => {
    const [selected, setSelected] = useState('');

    return (
        <div className="flex items-center space-x-2">
            <select
                className="border px-2 dark:bg-gray-800 py-1 rounded"
                value={selected}
                onChange={e => setSelected(e.target.value)}
            >
                <option value="">Select location...</option>
                {availableLocations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
            </select>
            <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                disabled={!selected}
                onClick={() => { onAdd(selected); setSelected(''); }}
            >
                Add
            </button>
        </div>
    );
};

export default InlineSelectAddLocation;
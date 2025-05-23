// ModalDialogAddLocation.tsx
import React, { useState } from 'react';

interface ModalDialogAddLocationProps {
    areaId: string;
    availableLocations: { id: string; name: string }[];
    onAdd: (locationIds: string[]) => void;
    onClose: () => void;
}

const ModalDialogAddLocation: React.FC<ModalDialogAddLocationProps> = ({
    areaId,
    availableLocations,
    onAdd,
    onClose,
}) => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);

    const filtered = availableLocations.filter(loc =>
        loc.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelect = (id: string) => {
        setSelected(sel =>
            sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-bold mb-2">Add Location(s) to Area</h2>
                <input
                    className="w-full border px-2 py-1 mb-2"
                    placeholder="Search locations..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="max-h-48 overflow-y-auto mb-2">
                    {filtered.map(loc => (
                        <label key={loc.id} className="block cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selected.includes(loc.id)}
                                onChange={() => toggleSelect(loc.id)}
                                className="mr-2"
                            />
                            {loc.name}
                        </label>
                    ))}
                    {filtered.length === 0 && <div className="text-gray-500">No locations found.</div>}
                </div>
                <div className="flex justify-end space-x-2">
                    <button className="px-4 py-1 rounded bg-gray-200" onClick={onClose}>Cancel</button>
                    <button
                        className="px-4 py-1 rounded bg-blue-600 text-white"
                        onClick={() => { onAdd(selected); onClose(); }}
                        disabled={selected.length === 0}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDialogAddLocation;
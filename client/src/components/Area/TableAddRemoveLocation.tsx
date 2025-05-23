// TableAddRemoveLocation.tsx
import React, { useState } from 'react';

interface TableAddRemoveLocationProps {
    areaId: string;
    currentLocations: { id: string; name: string }[];
    availableLocations: { id: string; name: string }[];
    onAdd: (locationId: string) => void;
    onRemove: (locationId: string) => void;
}

const TableAddRemoveLocation: React.FC<TableAddRemoveLocationProps> = ({
    areaId,
    currentLocations,
    availableLocations,
    onAdd,
    onRemove,
}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <h3 className="font-bold mb-2">Locations in Area</h3>
            <table className="min-w-full dark:bg-gray-800 text-black rounded shadow mb-2">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLocations.map(loc => (
                        <tr key={loc.id}>
                            <td className="border px-4 py-2">{loc.name}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                    onClick={() => onRemove(loc.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentLocations.length === 0 && (
                        <tr>
                            <td colSpan={2} className="text-center text-gray-500 py-2">No locations in this area.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => setShowModal(true)}
            >
                Add Location
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-2">Add Location</h2>
                        <select
                            className="w-full dark:bg-gray-800 border px-2 py-1 mb-4"
                            defaultValue=""
                            onChange={e => {
                                if (e.target.value) {
                                    onAdd(e.target.value);
                                    setShowModal(false);
                                }
                            }}
                        >
                            <option value="">Select location...</option>
                            {availableLocations.map(loc => (
                                <option key={loc.id} value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                        <div className="flex justify-end">
                            <button className="px-4 py-1 rounded bg-gray-200" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableAddRemoveLocation;
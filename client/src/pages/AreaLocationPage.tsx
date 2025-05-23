import React, { useMemo, useState } from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useAreas } from '../hooks/useAreas';
import { useLocations } from '../hooks/useLocations';
import TableAddRemoveLocation from '../components/area/TableAddRemoveLocation';
import InlineSelectAddLocation from '../components/area/InlineSelectAddLocation';
import ModalDialogAddLocation from '../components/area/ModalDialogAddLocation';

const AreaLocationsPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { areas, fetchAreas } = useAreas(selectedMountain?.id);
    const { locations, addAreaToLocation, removeAreaFromLocation, fetchLocations } = useLocations(selectedMountain?.id);

    const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Find locations for the selected area
    const currentArea = useMemo(() => areas.find(a => a.id === selectedAreaId), [areas, selectedAreaId]);
    const currentLocations = useMemo(
        () => locations.filter(loc => loc.areaId === selectedAreaId),
        [locations, selectedAreaId]
    );
    const availableLocations = useMemo(
        () => locations.filter(loc => !loc.areaId || loc.areaId !== selectedAreaId),
        [locations, selectedAreaId]
    );

    const handleAddLocation = async (locationId: string) => {
        if (!selectedAreaId) return;
        await addAreaToLocation(locationId, selectedAreaId);
        await fetchLocations();
        await fetchAreas();
    };

    const handleRemoveLocation = async (locationId: string) => {
        if (!selectedAreaId) return;
        await removeAreaFromLocation(locationId, selectedAreaId);
        await fetchLocations();
        await fetchAreas();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Area Locations</h1>
            <div className="mb-4">
                <label className="mr-2 font-semibold">Select Area:</label>
                <select
                    className="border dark:bg-gray-800 px-2 py-1 rounded"
                    value={selectedAreaId ?? ''}
                    onChange={e => setSelectedAreaId(e.target.value || null)}
                >
                    <option value="">-- Choose an Area --</option>
                    {areas.map(area => (
                        <option key={area.id} value={area.id}>{area.name}</option>
                    ))}
                </select>
            </div>
            {selectedAreaId && (
                <>
                    <TableAddRemoveLocation
                        areaId={selectedAreaId}
                        currentLocations={currentLocations.map(l => ({ id: l.id, name: l.name }))}
                        availableLocations={availableLocations.map(l => ({ id: l.id, name: l.name }))}
                        onAdd={handleAddLocation}
                        onRemove={handleRemoveLocation}
                    />
                    <div className="my-4">
                        <InlineSelectAddLocation
                            areaId={selectedAreaId}
                            availableLocations={availableLocations.map(l => ({ id: l.id, name: l.name }))}
                            onAdd={handleAddLocation}
                        />
                        <button
                            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded"
                            onClick={() => setShowModal(true)}
                        >
                            Add Multiple Locations
                        </button>
                    </div>
                    {showModal && (
                        <ModalDialogAddLocation
                            areaId={selectedAreaId}
                            availableLocations={availableLocations.map(l => ({ id: l.id, name: l.name }))}
                            onAdd={async (locationIds) => {
                                for (const id of locationIds) {
                                    await addAreaToLocation(id, selectedAreaId);
                                }
                                await fetchLocations();
                                await fetchAreas();
                            }}
                            onClose={() => setShowModal(false)}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default AreaLocationsPage;
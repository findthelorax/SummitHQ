import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useTrails } from '../../hooks/trail/useTrails';
import type { TrailWithLocation } from '../../types/index';
import AdminTrailsTableAgGrid from '../trail/AdminTrailsTableAgGrid';

const AdminTrails: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { trails, isLoadingTrails, fetchTrails, updateTrail, deleteTrail, createTrail } =
        useTrails(selectedMountain?.id);
    const [editingTrail, setEditingTrail] = useState<TrailWithLocation | null>(null);

    return (
        <AdminTrailsTableAgGrid
            trails={trails}
            fetchTrails={fetchTrails}
            isLoading={isLoadingTrails}
            updateTrail={updateTrail}
            deleteTrail={deleteTrail}
            onAddTrail={createTrail}
            onEditTrail={setEditingTrail}
            mountainId={selectedMountain?.id || ''}
            mountainName={selectedMountain?.name || ''}
        />
    );
};

export default AdminTrails;
import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useLifts } from '../../hooks/useLifts';
import type { LiftWithLocation } from '../../types/index';
import AdminLiftsTableAgGrid from '../lift/AdminLiftsTableAgGrid';

const AdminLifts: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { lifts, isLoadingLifts, fetchLifts, updateLift, deleteLift, createLift } =
        useLifts(selectedMountain?.id);
    const [editingLift, setEditingLift] = useState<LiftWithLocation | null>(null);

    return (
        <AdminLiftsTableAgGrid
            lifts={lifts}
            fetchLifts={fetchLifts}
            isLoading={isLoadingLifts}
            updateLift={updateLift}
            deleteLift={deleteLift}
            onAddLift={createLift}
            onEditLift={setEditingLift}
            mountainId={selectedMountain?.id || ''}
            mountainName={selectedMountain?.name || ''}
        />
    );
};

export default AdminLifts;
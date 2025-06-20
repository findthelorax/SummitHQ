import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useHuts } from '../../hooks/useHuts';
import type { HutWithLocation } from '../../types/index';
import AdminHutsTableAgGrid from '../hut/AdminHutsTableAgGrid';

const AdminHuts: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { huts, isLoadingHuts, fetchHuts, updateHut, deleteHut, createHut } =
        useHuts(selectedMountain?.id);
    const [editingHut, setEditingHut] = useState<HutWithLocation | null>(null);

    return (
        <AdminHutsTableAgGrid
            huts={huts}
            fetchHuts={fetchHuts}
            isLoading={isLoadingHuts}
            updateHut={updateHut}
            deleteHut={deleteHut}
            onAddHut={createHut}
            onEditHut={setEditingHut}
            mountainId={selectedMountain?.id || ''}
            mountainName={selectedMountain?.name || ''}
        />
    );
};

export default AdminHuts;
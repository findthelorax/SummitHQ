import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import type { MountainDTO } from '../../types/index';
import AdminMountainTableAgGrid from '../../components/mountain/AdminMountainsTableAgGrid';

const AdminMountain: React.FC = () => {
    const {
        mountains,
        isLoadingMountains,
        fetchMountains,
        updateMountain,
        deleteMountain,
        createMountain,
    } = useMountain();
    const [editingMountain, setEditingMountain] = useState<MountainDTO | null>(null);

    return (
        <>
            <AdminMountainTableAgGrid
                mountains={mountains}
                isLoading={isLoadingMountains}
                fetchMountains={fetchMountains}
                updateMountain={updateMountain}
                deleteMountain={deleteMountain}
                onAddMountain={createMountain}
                onEditMountain={setEditingMountain}
            />
        </>
    );
};

export default AdminMountain;
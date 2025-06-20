import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useAidRooms } from '../../hooks/useAidRooms';
import type { AidRoomWithLocation } from '../../types/index';
import AdminAidRoomsTableAgGrid from '../aidRoom/AdminAidRoomsTableAgGrid';

const AdminAidRooms: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { aidRooms, isLoadingAidRooms, fetchAidRooms, updateAidRoom, deleteAidRoom, createAidRoom } =
        useAidRooms(selectedMountain?.id);
    const [editingAidRoom, setEditingAidRoom] = useState<AidRoomWithLocation | null>(null);

    return (
        <AdminAidRoomsTableAgGrid
            aidRooms={aidRooms}
            fetchAidRooms={fetchAidRooms}
            isLoading={isLoadingAidRooms}
            updateAidRoom={updateAidRoom}
            deleteAidRoom={deleteAidRoom}
            onAddAidRoom={createAidRoom}
            onEditAidRoom={setEditingAidRoom}
            mountainId={selectedMountain?.id || ''}
            mountainName={selectedMountain?.name || ''}
        />
    );
};

export default AdminAidRooms;
import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useAidRooms } from '../hooks/useAidRooms';
import AidRoomForm from '../components/aidRoom/AidRoomForm';
import AidRoomTableAgGrid from '../components/aidRoom/AidRoomTableAgGrid';

const AidRoomsPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { aidRooms, fetchAidRooms, isLoading } = useAidRooms(selectedMountain?.id);

    return (
        <>
            <AidRoomForm onCreated={fetchAidRooms} />
            <AidRoomTableAgGrid aidRooms={aidRooms} fetchAidRooms={fetchAidRooms} isLoading={isLoading} />
        </>
    );
};

export default AidRoomsPage;
import * as React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useAidRooms } from '../hooks/useAidRooms';
import BaseAidRoomTableAgGrid from '../components/aidRoom/BaseAidRoomsTableAgGrid';
import type { AidRoomWithLocation } from '../types/index';

const AidRoomsPage: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { aidRooms, fetchAidRooms, isLoadingAidRooms, updateAidRoom, deleteAidRoom, createAidRoom } = useAidRooms(selectedMountain?.id);

	if (!selectedMountain) {
		return <div>Please select a mountain to view its aid rooms.</div>;
	}

	return (
		<>
			<BaseAidRoomTableAgGrid
				aidRooms={aidRooms}
				fetchAidRooms={fetchAidRooms}
				isLoading={isLoadingAidRooms}
				updateAidRoom={updateAidRoom}
				mountainId={selectedMountain.id}
				mountainName={selectedMountain.name}
			/>
		</>
	);
};

export default AidRoomsPage;

import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useAreas } from '../../hooks/useAreas';
import type { AreaDTO } from '../../types/index';
// import AdminAreasTableAgGrid from '../area/AdminAreasTableAgGrid';
import AreaTable from '../area/AreaTable';

const AdminAreas: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { areas, isLoadingAreas, fetchAreas, updateArea, deleteArea, createArea } = useAreas(selectedMountain?.id);
	const [editingArea, setEditingArea] = useState<AreaDTO | null>(null);

	return (
		<>In Progress</>

		// <AdminAreasTableAgGrid
		//     areas={areas}
		//     fetchAreas={fetchAreas}
		//     isLoading={isLoadingAreas}
		//     updateArea={updateArea}
		//     deleteArea={deleteArea}
		//     onAddArea={createArea}
		//     onEditArea={setEditingArea}
		//     mountainId={selectedMountain?.id || ''}
		//     mountainName={selectedMountain?.name || ''}
		// />
	);
};

export default AdminAreas;

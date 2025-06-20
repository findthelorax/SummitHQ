import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useLodges } from '../../hooks/useLodges';
import type { LodgeDTO } from '../../types/index';
import AdminLodgeTableAgGrid from '../lodge/AdminLodgesTableAgGrid';

const AdminLodge: React.FC = () => {
    const { selectedMountain } = useMountain();
	const { lodges, isLoadingLodges, fetchLodges, updateLodge, deleteLodge, createLodge } =
		useLodges(selectedMountain?.id);
	const [editingLodge, setEditingLodge] = useState<LodgeDTO | null>(null);

	return (
		<>
			<AdminLodgeTableAgGrid
				lodges={lodges}
				fetchLodges={fetchLodges}
				isLoading={isLoadingLodges}
				updateLodge={updateLodge}
				deleteLodge={deleteLodge}
				onAddLodge={createLodge}
				onEditLodge={setEditingLodge}
				mountainId={selectedMountain?.id || ''}
				mountainName={selectedMountain?.name || ''}
			/>
		</>
	);
};

export default AdminLodge;

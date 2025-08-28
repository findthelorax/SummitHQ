import * as React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useLodges } from '../hooks/useLodges';
import BasicLodgeTableAgGrid from '../components/lodge/BaseLodgesTableAgGrid';

const LodgesPage: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { lodges, fetchLodges, isLoadingLodges, updateLodge, deleteLodge, createLodge } = useLodges(selectedMountain?.id);

	if (!selectedMountain) {
		return <div>Please select a mountain to view its lodges.</div>;
	}
	return (
		<>
			<BasicLodgeTableAgGrid
				lodges={lodges}
				fetchLodges={fetchLodges}
				isLoading={isLoadingLodges}
				updateLodge={updateLodge}
				mountainId={selectedMountain?.id || ''}
				mountainName={selectedMountain?.name || ''}
			/>
		</>
	);
};

export default LodgesPage;

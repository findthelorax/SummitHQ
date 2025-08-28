import * as React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useHuts } from '../hooks/useHuts';
import BaseHutsTableAgGrid from '../components/hut/BaseHutsTableAgGrid';
import type { HutWithLocation } from '../types/index';

const HutsPage: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { huts, fetchHuts, isLoadingHuts, updateHut, deleteHut, createHut } = useHuts(selectedMountain?.id);
	const [editingHut, setEditingHut] = React.useState<HutWithLocation | null>(null);

	if (!selectedMountain) {
		return <div>Please select a mountain to view its huts.</div>;
	}
	return (
		<>
			<BaseHutsTableAgGrid
				huts={huts}
				fetchHuts={fetchHuts}
				isLoading={isLoadingHuts}
				updateHut={updateHut}
                mountainId={selectedMountain.id}
                mountainName={selectedMountain.name}
			/>
		</>
	);
};

export default HutsPage;

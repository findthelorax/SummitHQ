import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useLifts } from '../hooks/useLifts';
import BaseLiftsTableAgGrid from '../components/lift/BaseLiftsTableAgGrid';
import type { LiftWithLocation } from '../types/index';
import NoSelectionNotice from '../components/common/NoSelectionNotice';

const LiftPage: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { lifts, fetchLifts, isLoadingLifts, updateLift, deleteLift, createLift } = useLifts(selectedMountain?.id);
	const [editingLift, setEditingLift] = React.useState<LiftWithLocation | null>(null);

if (!selectedMountain) {
    return (
        <NoSelectionNotice
            title="No Mountain Selected"
            message={
                <>
                    Please select a mountain to view its lifts.<br />
                    You can choose a mountain from the menu above.
                </>
            }
        />
    );
}
	return (
		<>
			<BaseLiftsTableAgGrid
				lifts={lifts}
				fetchLifts={fetchLifts}
				isLoading={isLoadingLifts}
				updateLift={updateLift}
				mountainId={selectedMountain?.id || ''}
				mountainName={selectedMountain?.name || ''}
			/>
		</>
	);
};

export default LiftPage;

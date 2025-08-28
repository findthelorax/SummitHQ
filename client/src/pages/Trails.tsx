import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useTrails } from '../hooks/useTrails';
import BaseTrailsTableAgGrid from '../components/trail/BaseTrailsTableAgGrid';
import NoSelectionNotice from '../components/common/NoSelectionNotice';

const TrailsPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { trails, fetchTrails, isLoadingTrails, updateTrail } = useTrails(selectedMountain?.id);

if (!selectedMountain) {
    return (
        <NoSelectionNotice
            title="No Mountain Selected"
            message={
                <>
                    Please select a mountain to view its trails.<br />
                    You can choose a mountain from the menu above.
                </>
            }
        />
    );
}

    return (
        <>
            <BaseTrailsTableAgGrid
                trails={trails}
                fetchTrails={fetchTrails}
                isLoading={isLoadingTrails}
                updateTrail={updateTrail}
                mountainId={selectedMountain.id}
                mountainName={selectedMountain.name}
            />
        </>
    );
};

export default TrailsPage;
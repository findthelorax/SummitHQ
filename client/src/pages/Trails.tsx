import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useTrails } from '../hooks/useTrails';
import TrailsList from '../components/trail/TrailsList';
import TrailForm from '../components/trail/TrailForm';
import TrailssTableAgGrid from '../components/trail/TrailsTableAgGrid';

const TrailPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { trails, fetchTrails, isLoading } = useTrails(selectedMountain?.id);

    return (
        <div>
            <TrailForm onCreated={fetchTrails} />
            <TrailssTableAgGrid
                trails={trails}
                fetchTrails={fetchTrails}
                isLoading={isLoading}
            />
        </div>
    );
};

export default TrailPage;
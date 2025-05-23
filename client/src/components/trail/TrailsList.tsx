import { useMountain } from '../../contexts/MountainContext';
import { useTrails } from '../../hooks/useTrails';
import React from 'react';

function TrailsList() {
    const { selectedMountain } = useMountain();
    const { fetchTrails } = useTrails(selectedMountain?.id);
    const { trails, isLoading: trailsLoading } = useTrails(selectedMountain?.id);
    const isLoading = trailsLoading;

    React.useEffect(() => {
        if (selectedMountain) {
            fetchTrails();
        }
    }, [selectedMountain, fetchTrails]);

    if (!selectedMountain) return <div>Select a mountain</div>;
    if (isLoading) return <div>Loading trails...</div>;

    return (
        <ul>
            {trails.map((trail) => (
                <li key={trail.id}>{trail.name}</li>
            ))}
        </ul>
    );
}

export default TrailsList;
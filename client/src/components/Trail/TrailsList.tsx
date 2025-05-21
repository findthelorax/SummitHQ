import { useMountain } from '../../contexts/MountainContext';

function TrailsList() {
    const { selectedMountain, trails, isLoading } = useMountain();

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
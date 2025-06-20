import React, { useState } from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useAreas } from '../hooks/useAreas';
import AreaTabs from '../components/area/AreaTabs';
import AreaTable from '../components/area/AreaTable';

const AreaEntitiesPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { areas, isLoadingAreas } = useAreas(selectedMountain?.id);
    const [tab, setTab] = useState(0);

    const handleTabChange = (_: React.MouseEvent<HTMLButtonElement>, newValue: number) => setTab(newValue);

    if (isLoadingAreas) return <div>Loading...</div>;
    if (!areas || areas.length === 0) return <div>No areas found.</div>;

    const selectedArea = areas[tab];

    return (
        <div>
            <AreaTabs value={tab} onChange={handleTabChange} areas={areas} />
            <AreaTable area={selectedArea} />
        </div>
    );
};

export default AreaEntitiesPage;
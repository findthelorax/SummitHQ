import React, { useState } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useAreas } from '../../hooks/useAreas';
import AreaTabs from './AreaTabs';
import AreaTable from './AreaTable';

const AreasEntities: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { areas, isLoading } = useAreas(selectedMountain?.id);
    const [tab, setTab] = useState(0);

    const handleTabChange = (event: React.MouseEvent<HTMLButtonElement>, newValue: number) => {
        setTab(newValue);
    };

    if (isLoading) {
        return <div className="text-center py-8 text-gray-500">Loading areas...</div>;
    }

    if (!areas || areas.length === 0) {
        return <div className="text-center py-8 text-gray-500">No areas found.</div>;
    }

    return (
        <div>
            <AreaTabs value={tab} onChange={handleTabChange} areas={areas} />
            <AreaTable value={tab} employees={[]} />
        </div>
    );
};

export default AreasEntities;
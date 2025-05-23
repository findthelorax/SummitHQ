import React, { useState } from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useAreas } from '../hooks/useAreas';
import AreaForm from '../components/area/AreaForm';
import AreaTable from '../components/area/AreaTable';
import AreaTabs from '../components/area/AreaTabs';
import AreasEntitiesPage from '../components/area/AreaEntities';
import TableAddRemoveLocation from '../components/area/TableAddRemoveLocation';
import InlineSelectAddLocation from '../components/area/InlineSelectAddLocation';
import ModalDialogAddLocation from '../components/area/ModalDialogAddLocation';

const AreasPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { areas, fetchAreas, isLoading } = useAreas(selectedMountain?.id);
    const [tab, setTab] = useState(0);

    const handleTabChange = (event: React.MouseEvent<HTMLButtonElement>, newValue: number) => {
        setTab(newValue);
    };

    return (
        <>
            <AreaForm onCreated={fetchAreas} />
            {areas.length > 0 && (
                <AreaTabs value={tab} onChange={handleTabChange} areas={areas} />
            )}
            <AreaTable value={tab} employees={[]} />
            <AreasEntitiesPage />
            
        </>
    );
};

export default AreasPage;
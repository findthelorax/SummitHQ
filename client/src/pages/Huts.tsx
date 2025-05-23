import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useHuts } from '../hooks/useHuts';
import HutForm from '../components/hut/HutForm';
import HutsTableAgGrid from '../components/hut/HutTableAgGrid';

const HutsPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { huts, fetchHuts, isLoading } = useHuts(selectedMountain?.id);

    return (
        <>
            <HutForm onCreated={fetchHuts} />
            <HutsTableAgGrid huts={huts} fetchHuts={fetchHuts} isLoading={isLoading} />
        </>
    );
};

export default HutsPage;
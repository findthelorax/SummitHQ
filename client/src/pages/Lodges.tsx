import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useLodges } from '../hooks/useLodges';
import LodgeForm from '../components/lodge/LodgeForm';
import LodgesTableAgGrid from '../components/lodge/LodgeTableAgGrid';

const LodgesPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { lodges, fetchLodges, isLoading } = useLodges(selectedMountain?.id);

    return (
        <>
            <LodgeForm onCreated={fetchLodges} />
            <LodgesTableAgGrid lodges={lodges} fetchLodges={fetchLodges} isLoading={isLoading} />
        </>
    );
};

export default LodgesPage;
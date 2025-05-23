import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useLifts } from '../hooks/useLifts';
import LiftForm from '../components/lift/LiftForm';
import LiftTable from '../components/lift/LiftTable';
import LiftsTableAgGrid from '../components/lift/LiftsTableAgGrid';

const LiftPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { lifts, fetchLifts, createLift, isLoading } = useLifts(selectedMountain?.id);

    return (
        <>
            <LiftForm onCreated={fetchLifts}/>
            <LiftTable lifts={lifts} fetchLifts={fetchLifts} isLoading={isLoading} />
            <LiftsTableAgGrid lifts={lifts} fetchLifts={fetchLifts} isLoading={isLoading} />
        </>
    );
};

export default LiftPage;
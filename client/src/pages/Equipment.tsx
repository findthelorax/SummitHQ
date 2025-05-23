import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useEquipment } from '../hooks/useEquipment';
import EquipmentForm from '../components/equipment/EquipmentForm';
import EquipmentTableAgGrid from '../components/equipment/EquipmentTableAgGrid';

const EquipmentPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { equipment, fetchEquipment, isLoading } = useEquipment(selectedMountain?.id);

    return (
        <>
            <EquipmentForm onCreated={fetchEquipment} />
            <EquipmentTableAgGrid equipment={equipment} fetchEquipment={fetchEquipment} isLoading={isLoading} />
        </>
    );
};

export default EquipmentPage;
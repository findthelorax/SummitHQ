import * as React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useEquipment } from '../hooks/useEquipment';
import BaseEquipmentTableAgGrid from '../components/equipment/BaseEquipmentTableAgGrid';
import NoSelectionNotice from '../components/common/NoSelectionNotice';

const EquipmentPage: React.FC = () => {
    const { mountains, selectedMountain } = useMountain();
    const {
        equipment,
        isLoadingEquipment,
        fetchEquipmentByMountain,
    } = useEquipment(selectedMountain?.id);

    if (!selectedMountain) {
        return (
            <NoSelectionNotice
                title="No Mountain Selected"
                message={
                    <>
                        Please select a mountain to view its equipment.<br />
                        You can choose a mountain from the menu above.
                    </>
                }
            />
        );
    }

    const filteredEquipment = equipment.filter((eq) =>
        eq.mountainId === selectedMountain.id
    );

    return (
        <>
            <BaseEquipmentTableAgGrid
                equipment={filteredEquipment}
                fetchEquipment={fetchEquipmentByMountain}
                isLoadingEquipment={isLoadingEquipment}
                mountains={mountains}
                mountainId={selectedMountain.id}
                mountainName={selectedMountain.name}
            />
        </>
    );
};

export default EquipmentPage;
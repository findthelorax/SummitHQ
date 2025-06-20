import React, { useState } from 'react';
import { useEquipment } from '../../hooks/useEquipment';
import { useMountain } from '../../contexts/MountainContext';
import type { EquipmentDTO } from '../../types/index';
import AdminEquipmentTableAgGrid from '../../components/equipment/AdminEquipmentTableAgGrid';

const AdminEquipmentPage: React.FC = () => {
    const {
        equipment,
        isLoadingEquipment,
        fetchAllEquipment,
        fetchEquipmentByMountain,
        updateEquipment,
        deleteEquipment,
        createEquipment,
    } = useEquipment();
    const { mountains, selectedMountain } = useMountain();
    const [editingEquipment, setEditingEquipment] = useState<EquipmentDTO | null>(null);

    return (
        <>
            <AdminEquipmentTableAgGrid
                equipment={equipment}
                mountains={mountains}
                isLoadingEquipment={isLoadingEquipment}
                fetchEquipment={fetchEquipmentByMountain}
                fetchAllEquipment={fetchAllEquipment}
                updateEquipment={updateEquipment}
                deleteEquipment={deleteEquipment}
                onAddEquipment={createEquipment}
                onEditEquipment={setEditingEquipment}
                mountainId={selectedMountain?.id ?? ''}
                mountainName={selectedMountain?.name ?? ''}
            />
        </>
    );
};

export default AdminEquipmentPage;
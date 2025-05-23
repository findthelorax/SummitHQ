import { useState, useEffect, useCallback } from 'react';
import { equipmentApi } from '../api/EquipmentAPI';
import type { Equipment } from 'shared/types';
import { EQUIPMENT_STATUS } from 'shared/types/enums';

type EquipmentInput = {
    name: string;
    type: string;
    number?: number;
    description?: string;
    status?: EQUIPMENT_STATUS;
    picture?: string;
    cost?: number;
    latitude?: number | null;
    longitude?: number | null;
    mountainId?: string;
    locationId?: string | null;
};

function toSharedEquipmentStatus(status: any): EQUIPMENT_STATUS {
    if (Object.values(EQUIPMENT_STATUS).includes(status)) return status as EQUIPMENT_STATUS;
    return EQUIPMENT_STATUS[status as keyof typeof EQUIPMENT_STATUS];
}

export function useEquipment(mountainId?: string) {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEquipment = useCallback(async () => {
        setIsLoading(true);
        try {
            if (mountainId) {
                const data = await equipmentApi.getEquipmentByMountain(mountainId);
                setEquipment(data);
            } else {
                const data = await equipmentApi.getAllEquipment();
                setEquipment(data);
            }
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchEquipment();
    }, [fetchEquipment]);

    const createEquipment = useCallback(
        async (input: EquipmentInput) => {
            const payload = {
                ...input,
                status: input.status ? toSharedEquipmentStatus(input.status) : EQUIPMENT_STATUS.OPERATIONAL,
                mountainId: input.mountainId ?? mountainId,
            };
            await equipmentApi.createEquipment(payload);
            await fetchEquipment();
        },
        [fetchEquipment, mountainId]
    );

    const updateEquipment = useCallback(
        async (equipmentId: string, updated: Partial<EquipmentInput>) => {
            const payload: Partial<EquipmentInput> = {
                ...(updated.name !== undefined ? { name: updated.name } : {}),
                ...(updated.type !== undefined ? { type: updated.type } : {}),
                ...(updated.status !== undefined ? { status: toSharedEquipmentStatus(updated.status) } : {}),
                ...(updated.description !== undefined ? { description: updated.description } : {}),
                ...(updated.number !== undefined ? { number: updated.number } : {}),
                ...(updated.picture !== undefined ? { picture: updated.picture } : {}),
                ...(updated.cost !== undefined ? { cost: updated.cost } : {}),
                ...(updated.latitude !== undefined ? { latitude: updated.latitude } : {}),
                ...(updated.longitude !== undefined ? { longitude: updated.longitude } : {}),
                ...(updated.locationId !== undefined ? { locationId: updated.locationId } : {}),
            };
            await equipmentApi.updateEquipment(equipmentId, payload);
            await fetchEquipment();
        },
        [fetchEquipment]
    );

    const deleteEquipment = useCallback(
        async (equipmentId: string) => {
            await equipmentApi.deleteEquipment(equipmentId);
            await fetchEquipment();
        },
        [fetchEquipment]
    );

    const assignToMountain = useCallback(
        async (equipmentId: string, mId: string) => {
            await equipmentApi.assignToMountain(equipmentId, mId);
            await fetchEquipment();
        },
        [fetchEquipment]
    );

    const removeFromMountain = useCallback(
        async (equipmentId: string, mId: string) => {
            await equipmentApi.removeFromMountain(equipmentId, mId);
            await fetchEquipment();
        },
        [fetchEquipment]
    );

    const assignToLocation = useCallback(
        async (equipmentId: string, locationId: string) => {
            if (!mountainId) return;
            await equipmentApi.assignToLocation(equipmentId, mountainId, locationId);
            await fetchEquipment();
        },
        [fetchEquipment, mountainId]
    );

    const removeFromLocation = useCallback(
        async (equipmentId: string, locationId: string) => {
            if (!mountainId) return;
            await equipmentApi.removeFromLocation(equipmentId, mountainId, locationId);
            await fetchEquipment();
        },
        [fetchEquipment, mountainId]
    );

    const moveToLocation = useCallback(
        async (equipmentId: string, newLocationId: string) => {
            if (!mountainId) return;
            await equipmentApi.moveToLocation(equipmentId, mountainId, newLocationId);
            await fetchEquipment();
        },
        [fetchEquipment, mountainId]
    );

    return {
        equipment,
        isLoading,
        fetchEquipment,
        createEquipment,
        updateEquipment,
        deleteEquipment,
        assignToMountain,
        removeFromMountain,
        assignToLocation,
        removeFromLocation,
        moveToLocation,
    };
}
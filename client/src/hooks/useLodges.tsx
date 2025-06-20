import { useState, useEffect, useCallback } from 'react';
import { lodgeApi } from '../api/LodgeAPI';
import type { LodgeDTO, LodgeWithLocation } from '../types/index';
import { STATUS } from '../types/generated-enums';
import type { LodgeInputPayload } from '../api/LodgeAPI';

function toSharedStatus(status: any): STATUS {
    if (Object.values(STATUS).includes(status)) return status as STATUS;
    return STATUS[status as keyof typeof STATUS];
}

export function useLodges(mountainId: string | undefined) {
    const [lodges, setLodges] = useState<LodgeDTO[]>([]);
    const [isLoadingLodges, setIsLoadingLodges] = useState(false);

    const fetchLodges = useCallback(async () => {
        if (!mountainId) {
            setLodges([]);
            return;
        }
        setIsLoadingLodges(true);
        try {
            let data: LodgeDTO[];
            data = await lodgeApi.getLodges(mountainId);
            setLodges(data);
        } finally {
            setIsLoadingLodges(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchLodges();
    }, [fetchLodges]);

    const createLodge = useCallback(
        async (lodge: LodgeInputPayload): Promise<LodgeWithLocation> => {
            if (!mountainId) throw new Error("No mountainId");
            const payload = {
                ...lodge,
                status: toSharedStatus(lodge.status),
            };
            const created = await lodgeApi.createLodge(mountainId, payload);
            await fetchLodges();
            if (!created || !created.id) throw new Error("Failed to create lodge");
            // Fetch the full LodgeWithLocation
            const full = await lodgeApi.getLodge(mountainId, created.id);
            if (!full) throw new Error("Failed to fetch LodgeWithLocation");
            return full;
        },
        [mountainId, fetchLodges]
    );

    const updateLodge = useCallback(
        async (lodgeId: string, updated: Partial<LodgeInputPayload>): Promise<LodgeWithLocation> => {
            if (!mountainId) throw new Error("No mountainId");
            const { name, capacity, status, latitude, longitude, areaId } = updated;
            const payload: Partial<LodgeInputPayload> = {
                ...(name !== undefined ? { name } : {}),
                ...(capacity !== undefined ? { capacity } : {}),
                ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
                ...(latitude !== undefined
                    ? { latitude: latitude === null || latitude === undefined ? null : Number(latitude) }
                    : {}),
                ...(longitude !== undefined
                    ? { longitude: longitude === null || longitude === undefined ? null : Number(longitude) }
                    : {}),
                ...(areaId !== undefined ? { areaId } : {}),
            };
            const updatedLodge = await lodgeApi.updateLodge(mountainId, lodgeId, payload);
            await fetchLodges();
            if (!updatedLodge || !updatedLodge.id) throw new Error("Failed to update lodge");
            // Fetch the full LodgeWithLocation
            const full = await lodgeApi.getLodge(mountainId, updatedLodge.id);
            if (!full) throw new Error("Failed to fetch LodgeWithLocation");
            return full;
        },
        [mountainId, fetchLodges]
    );

    const deleteLodge = useCallback(
        async (lodgeId: string) => {
            if (!mountainId) return;
            await lodgeApi.deleteLodge(mountainId, lodgeId);
            await fetchLodges();
        },
        [mountainId, fetchLodges]
    );

    return {
        lodges,
        isLoadingLodges,
        fetchLodges,
        createLodge,
        updateLodge,
        deleteLodge,
    };
}
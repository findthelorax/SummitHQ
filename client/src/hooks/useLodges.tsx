import { useState, useEffect, useCallback } from 'react';
import { lodgeApi } from '../api/LodgeAPI';
import type { Lodge } from 'shared/types';
import { STATUS } from 'shared/types/enums';
import type { LodgeCreatePayload } from '../api/LodgeAPI';

function toSharedStatus(status: any): STATUS {
    if (Object.values(STATUS).includes(status)) return status as STATUS;
    return STATUS[status as keyof typeof STATUS];
}

export function useLodges(mountainId: string | undefined) {
    const [lodges, setLodges] = useState<Lodge[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLodges = useCallback(async () => {
        if (!mountainId) {
            setLodges([]);
            return;
        }
        setIsLoading(true);
        try {
            const data = await lodgeApi.getLodges(mountainId);
            setLodges(data);
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchLodges();
    }, [fetchLodges]);

    const createLodge = async (lodge: LodgeCreatePayload) => {
        if (!mountainId) return;
        const payload = {
            ...lodge,
            status: toSharedStatus(lodge.status),
        };
        await lodgeApi.createLodge(mountainId, payload);
        await fetchLodges();
    };

    const updateLodge = async (lodgeId: string, updated: Partial<Lodge>) => {
        if (!mountainId) return;
        const { name, capacity, latitude, longitude, status } = updated;
        const payload: Partial<LodgeCreatePayload> = {
            ...(name !== undefined ? { name } : {}),
            ...(capacity !== undefined ? { capacity } : {}),
            ...(latitude !== undefined
                ? { latitude: latitude === null || latitude === undefined ? null : Number(latitude) }
                : {}),
            ...(longitude !== undefined
                ? { longitude: longitude === null || longitude === undefined ? null : Number(longitude) }
                : {}),
            ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
        };
        await lodgeApi.updateLodge(mountainId, lodgeId, payload);
        await fetchLodges();
    };

    const deleteLodge = async (lodgeId: string) => {
        if (!mountainId) return;
        await lodgeApi.deleteLodge(mountainId, lodgeId);
        await fetchLodges();
    };

    return { lodges, isLoading, fetchLodges, createLodge, updateLodge, deleteLodge };
}
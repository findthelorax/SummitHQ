import { useState, useEffect, useCallback } from 'react';
import { hutApi, HutInputPayload } from '../api/HutAPI';
import type { HutDTO, HutFull, HutWithLocation } from '../types/index';
import { STATUS } from '../types/generated-enums';

function toSharedStatus(status: any): STATUS {
    if (Object.values(STATUS).includes(status)) return status as STATUS;
    return STATUS[status as keyof typeof STATUS];
}

export function useHuts(mountainId: string | undefined) {
    const [huts, setHuts] = useState<HutFull[]>([]);
    const [isLoadingHuts, setIsLoadingHuts] = useState(false);

    const fetchHuts = useCallback(async () => {
        if (!mountainId) {
            setHuts([]);
            return;
        }
        setIsLoadingHuts(true);
        try {
            let data: HutFull[];
            const rawData = await hutApi.getHuts(mountainId);
            data = rawData.map((hut: any) => ({
                ...hut,
                hutChecks: hut.hutChecks ?? [],
            }));
            setHuts(data);
        } finally {
            setIsLoadingHuts(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchHuts();
    }, [fetchHuts]);

    const createHut = useCallback(
        async (hut: HutInputPayload) => {
            if (!mountainId) throw new Error('No mountainId provided');
            const payload = {
                ...hut,
                status: toSharedStatus(hut.status),
            };
            const created = await hutApi.createHut(mountainId, payload);
            await fetchHuts();
            if (!created) throw new Error('Hut creation failed');
            return created as HutWithLocation;
        },
        [mountainId, fetchHuts]
    );

    const updateHut = useCallback(
        async (hutId: string, updated: Partial<HutInputPayload>) => {
            if (!mountainId) throw new Error('No mountainId provided');
            const { name, status, latitude, longitude, areaId } = updated;
            const payload: Partial<HutInputPayload> = {
                ...(name !== undefined ? { name } : {}),
                ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
                ...(latitude !== undefined
                    ? { latitude: latitude === undefined ? undefined : Number(latitude) }
                    : {}),
                ...(longitude !== undefined
                    ? { longitude: longitude === undefined ? undefined : Number(longitude) }
                    : {}),
                ...(areaId !== undefined ? { areaId: areaId ?? undefined } : {}),
            };
            const updatedHut = await hutApi.updateHut(mountainId, hutId, payload);
            await fetchHuts();
            return updatedHut as HutWithLocation;
        },
        [mountainId, fetchHuts]
    );

    const deleteHut = useCallback(
        async (hutId: string) => {
            if (!mountainId) return;
            await hutApi.deleteHut(mountainId, hutId);
            await fetchHuts();
        },
        [mountainId, fetchHuts]
    );

    return {
        huts,
        isLoadingHuts,
        fetchHuts,
        createHut,
        updateHut,
        deleteHut,
    };
}
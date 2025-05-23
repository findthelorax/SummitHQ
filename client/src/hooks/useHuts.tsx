import { useState, useEffect, useCallback } from 'react';
import { hutApi } from '../api/HutAPI';
import type { Hut } from 'shared/types';
import { STATUS } from 'shared/types/enums';
import type { HutCreatePayload } from '../api/HutAPI';

function toSharedStatus(status: any): STATUS {
    if (Object.values(STATUS).includes(status)) return status as STATUS;
    return STATUS[status as keyof typeof STATUS];
}

export function useHuts(mountainId: string | undefined) {
    const [huts, setHuts] = useState<Hut[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchHuts = useCallback(async () => {
        if (!mountainId) {
            setHuts([]);
            return;
        }
        setIsLoading(true);
        try {
            const data = await hutApi.getHuts(mountainId);
            setHuts(data);
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchHuts();
    }, [fetchHuts]);

    const createHut = async (hut: HutCreatePayload) => {
        if (!mountainId) return;
        const payload = {
            ...hut,
            status: toSharedStatus(hut.status),
        };
        await hutApi.createHut(mountainId, payload);
        await fetchHuts();
    };

    const updateHut = async (hutId: string, updated: Partial<Hut>) => {
        if (!mountainId) return;
        const { name, status, latitude, longitude } = updated;
        const payload: Partial<HutCreatePayload> = {
            ...(name !== undefined ? { name } : {}),
            ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
            ...(latitude !== undefined
                ? { latitude: latitude === null || latitude === undefined ? null : Number(latitude) }
                : {}),
            ...(longitude !== undefined
                ? { longitude: longitude === null || longitude === undefined ? null : Number(longitude) }
                : {}),
        };
        await hutApi.updateHut(mountainId, hutId, payload);
        await fetchHuts();
    };

    const deleteHut = async (hutId: string) => {
        if (!mountainId) return;
        await hutApi.deleteHut(mountainId, hutId);
        await fetchHuts();
    };

    return { huts, isLoading, fetchHuts, createHut, updateHut, deleteHut };
}
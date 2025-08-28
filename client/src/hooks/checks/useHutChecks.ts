import { useState, useEffect, useCallback } from 'react';
import { hutApi, HutCheckInputPayload } from '../../api/HutAPI';
import type { HutCheckFull } from '../../types/index';

export function useHutChecks(mountainId: string | undefined, hutId: string | undefined) {
    const [hutChecks, setHutChecks] = useState<HutCheckFull[]>([]);
    const [isLoadingHutChecks, setIsLoadingHutChecks] = useState(false);

    const fetchHutChecks = useCallback(async () => {
        if (!mountainId) {
            setHutChecks([]);
            return;
        }
        setIsLoadingHutChecks(true);
        try {
            let data: HutCheckFull[];
            if (hutId && hutId !== 'all') {
                data = await hutApi.getHutChecks(mountainId, hutId);
            } else if (hutId === 'all') {
                data = await hutApi.getAllHutChecks(mountainId);
            } else {
                data = [];
            }
            setHutChecks(data);
        } finally {
            setIsLoadingHutChecks(false);
        }
    }, [mountainId, hutId]);

    useEffect(() => {
        fetchHutChecks();
    }, [fetchHutChecks]);

    const createHutCheck = useCallback(
        async (check: HutCheckInputPayload) => {
            if (!mountainId || !hutId) return Promise.reject('Missing mountainId or hutId');
            const created = await hutApi.createHutCheck(mountainId, hutId, check);
            await fetchHutChecks();
            return created;
        },
        [mountainId, hutId, fetchHutChecks]
    );

    const updateHutCheck = useCallback(
        async (hutCheckId: string, updated: Partial<HutCheckFull>) => {
            if (!mountainId || !hutId) return Promise.reject('Missing mountainId or hutId');
            const updatedCheck = await hutApi.updateHutCheck(mountainId, hutId, hutCheckId, updated);
            await fetchHutChecks();
            return updatedCheck;
        },
        [mountainId, hutId, fetchHutChecks]
    );

    const deleteHutCheck = useCallback(
        async (hutCheckId: string) => {
            if (!mountainId || !hutId) return;
            await hutApi.deleteHutCheck(mountainId, hutId, hutCheckId);
            await fetchHutChecks();
        },
        [mountainId, hutId, fetchHutChecks]
    );

    return {
        hutChecks,
        setIsLoadingHutChecks,
        fetchHutChecks,
        createHutCheck,
        updateHutCheck,
        deleteHutCheck,
    };
}
import { useState, useEffect, useCallback } from 'react';
import { aidRoomApi } from '../../api/AidRoomAPI';
import type { AidRoomCheckFull } from '../../types/index';
import type { AidRoomCheckInputPayload } from '../../api/AidRoomAPI';

export function useAidRoomChecks(mountainId: string | undefined, aidRoomId: string | undefined) {
    const [aidRoomChecks, setAidRoomChecks] = useState<AidRoomCheckFull[]>([]);
    const [isLoadingAidRoomChecks, setIsLoadingAidRoomChecks] = useState(false);

    const fetchAidRoomChecks = useCallback(async () => {
        if (!mountainId) {
            setAidRoomChecks([]);
            return;
        }
        setIsLoadingAidRoomChecks(true);
        try {
            let data: AidRoomCheckFull[];
            if (aidRoomId && aidRoomId !== 'all') {
                data = await aidRoomApi.getAidRoomChecks(mountainId, aidRoomId);
            } else if (aidRoomId === 'all') {
                data = await aidRoomApi.getAllAidRoomChecks(mountainId);
            } else {
                data = [];
            }
            setAidRoomChecks(data);
        } finally {
            setIsLoadingAidRoomChecks(false);
        }
    }, [mountainId, aidRoomId]);

    useEffect(() => {
        fetchAidRoomChecks();
    }, [fetchAidRoomChecks]);

    const createAidRoomCheck = useCallback(
        async (check: AidRoomCheckInputPayload) => {
            if (!mountainId || !aidRoomId) return Promise.reject('Missing mountainId or aidRoomId');
            const created = await aidRoomApi.createAidRoomCheck(mountainId, aidRoomId, check);
            await fetchAidRoomChecks();
            return created;
        },
        [mountainId, aidRoomId, fetchAidRoomChecks]
    );

    const updateAidRoomCheck = useCallback(
        async (aidRoomCheckId: string, updated: Partial<AidRoomCheckFull>) => {
            if (!mountainId || !aidRoomId) return Promise.reject('Missing mountainId or aidRoomId');
            const updatedCheck = await aidRoomApi.updateAidRoomCheck(mountainId, aidRoomId, aidRoomCheckId, updated);
            await fetchAidRoomChecks();
            return updatedCheck;
        },
        [mountainId, aidRoomId, fetchAidRoomChecks]
    );

    const deleteAidRoomCheck = useCallback(
        async (aidRoomCheckId: string) => {
            if (!mountainId || !aidRoomId) return;
            await aidRoomApi.deleteAidRoomCheck(mountainId, aidRoomId, aidRoomCheckId);
            await fetchAidRoomChecks();
        },
        [mountainId, aidRoomId, fetchAidRoomChecks]
    );

    return {
        aidRoomChecks,
        setIsLoadingAidRoomChecks,
        fetchAidRoomChecks,
        createAidRoomCheck,
        updateAidRoomCheck,
        deleteAidRoomCheck,
    };
}
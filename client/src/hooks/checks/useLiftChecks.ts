import { useState, useEffect, useCallback } from 'react';
import { liftApi, LiftCheckInputPayload } from '../../api/LiftAPI';
import type { LiftCheckFull } from '../../types/index';

export function useLiftChecks(mountainId: string | undefined, liftId: string | undefined) {
    const [liftChecks, setLiftChecks] = useState<LiftCheckFull[]>([]);
    const [isLoadingLiftChecks, setIsLoadingLiftChecks] = useState(false);

    const fetchLiftChecks = useCallback(async () => {
        if (!mountainId) {
            setLiftChecks([]);
            return;
        }
        setIsLoadingLiftChecks(true);
        try {
            let data: LiftCheckFull[];
            if (liftId && liftId !== 'all') {
                data = await liftApi.getLiftChecks(mountainId, liftId);
            } else if (liftId === 'all') {
                data = await liftApi.getAllLiftChecks(mountainId);
            } else {
                data = [];
            }
            setLiftChecks(data);
        } finally {
            setIsLoadingLiftChecks(false);
        }
    }, [mountainId, liftId]);

    useEffect(() => {
        fetchLiftChecks();
    }, [fetchLiftChecks]);

    const createLiftCheck = useCallback(
        async (check: LiftCheckInputPayload) => {
            if (!mountainId || !liftId) return Promise.reject('Missing mountainId or liftId');
            const created = await liftApi.createLiftCheck(mountainId, liftId, check);
            await fetchLiftChecks();
            return created;
        },
        [mountainId, liftId, fetchLiftChecks]
    );

    const updateLiftCheck = useCallback(
        async (liftCheckId: string, updated: Partial<LiftCheckInputPayload>) => {
            if (!mountainId || !liftId) return Promise.reject('Missing mountainId or liftId');
            const updatedCheck = await liftApi.updateLiftCheck(mountainId, liftId, liftCheckId, updated);
            await fetchLiftChecks();
            return updatedCheck;
        },
        [mountainId, liftId, fetchLiftChecks]
    );

    const deleteLiftCheck = useCallback(
        async (liftCheckId: string) => {
            if (!mountainId || !liftId) return;
            await liftApi.deleteLiftCheck(mountainId, liftId, liftCheckId);
            await fetchLiftChecks();
        },
        [mountainId, liftId, fetchLiftChecks]
    );

    return {
        liftChecks,
        setIsLoadingLiftChecks,
        fetchLiftChecks,
        createLiftCheck,
        updateLiftCheck,
        deleteLiftCheck,
    };
}
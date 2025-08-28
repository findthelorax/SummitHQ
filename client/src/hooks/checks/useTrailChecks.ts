import { useState, useEffect, useCallback } from 'react';
import { trailApi, TrailCheckInputPayload } from '../../api/TrailAPI';
import type { TrailCheckFull } from '../../types/index';

export function useTrailChecks(mountainId: string | undefined, trailId: string | undefined) {
    const [trailChecks, setTrailChecks] = useState<TrailCheckFull[]>([]);
    const [isLoadingTrailChecks, setIsLoadingTrailChecks] = useState(false);

    const fetchTrailChecks = useCallback(async () => {
        if (!mountainId) {
            setTrailChecks([]);
            return;
        }
        setIsLoadingTrailChecks(true);
        try {
            let data: TrailCheckFull[];
            if (trailId && trailId !== 'all') {
                data = await trailApi.getTrailChecks(mountainId, trailId);
            } else if (trailId === 'all') {
                data = await trailApi.getAllTrailChecks(mountainId);
            } else {
                data = [];
            }
            setTrailChecks(data);
        } finally {
            setIsLoadingTrailChecks(false);
        }
    }, [mountainId, trailId]);

    useEffect(() => {
        fetchTrailChecks();
    }, [fetchTrailChecks]);

    const createTrailCheck = useCallback(
        async (check: TrailCheckInputPayload) => {
            if (!mountainId || !trailId) return Promise.reject('Missing mountainId or trailId');
            const created = await trailApi.createTrailCheck(mountainId, trailId, check);
            await fetchTrailChecks();
            return created;
        },
        [mountainId, trailId, fetchTrailChecks]
    );

    const updateTrailCheck = useCallback(
        async (trailCheckId: string, updated: Partial<TrailCheckInputPayload>) => {
            if (!mountainId || !trailId) return Promise.reject('Missing mountainId or trailId');
            const updatedCheck = await trailApi.updateTrailCheck(mountainId, trailId, trailCheckId, updated);
            await fetchTrailChecks();
            return updatedCheck;
        },
        [mountainId, trailId, fetchTrailChecks]
    );

    const deleteTrailCheck = useCallback(
        async (trailCheckId: string) => {
            if (!mountainId || !trailId) return;
            await trailApi.deleteTrailCheck(mountainId, trailId, trailCheckId);
            await fetchTrailChecks();
        },
        [mountainId, trailId, fetchTrailChecks]
    );

    return {
        trailChecks,
        setIsLoadingTrailChecks,
        fetchTrailChecks,
        createTrailCheck,
        updateTrailCheck,
        deleteTrailCheck,
    };
}
import { useState, useEffect, useCallback } from 'react';
import { liftApi } from '../api/LiftAPI';
import type { Lift } from 'shared/types';
import { LIFT_TYPE, STATUS } from 'shared/types/enums';
import type { LiftCreatePayload } from '../api/LiftAPI';

function toSharedLiftType(type: any): LIFT_TYPE {
    if (Object.values(LIFT_TYPE).includes(type)) return type as LIFT_TYPE;
    return LIFT_TYPE[type as keyof typeof LIFT_TYPE];
}

function toSharedStatus(status: any): STATUS {
    if (Object.values(STATUS).includes(status)) return status as STATUS;
    return STATUS[status as keyof typeof STATUS];
}

export function useLifts(mountainId: string | undefined) {
    const [lifts, setLifts] = useState<Lift[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLifts = useCallback(async () => {
        if (!mountainId) {
            setLifts([]);
            return;
        }
        setIsLoading(true);
        try {
            const data = await liftApi.getLifts(mountainId);
            setLifts(data);
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchLifts();
    }, [fetchLifts]);

    const createLift = useCallback(async (lift: LiftCreatePayload) => {
        if (!mountainId) return;
        const payload = {
            ...lift,
            type: toSharedLiftType(lift.type),
            status: toSharedStatus(lift.status),
        };
        await liftApi.createLift(mountainId, payload);
        await fetchLifts();
    }, [mountainId, fetchLifts]);

    const updateLift = useCallback(async (liftId: string, updated: Partial<Lift>) => {
        if (!mountainId) return;
        const { name, type, status, capacity, latitude, longitude, locationId } = updated;
        const payload: Partial<LiftCreatePayload> = {
            ...(name !== undefined ? { name } : {}),
            ...(type !== undefined ? { type: toSharedLiftType(type) } : {}),
            ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
            ...(capacity !== undefined ? { capacity } : {}),
            ...(latitude !== undefined
                ? { latitude: latitude === null || latitude === undefined ? null : Number(latitude) }
                : {}),
            ...(longitude !== undefined
                ? { longitude: longitude === null || longitude === undefined ? null : Number(longitude) }
                : {}),
            ...(locationId !== undefined ? { locationId } : {}),
        };
        await liftApi.updateLift(mountainId, liftId, payload);
        await fetchLifts();
    }, [mountainId, fetchLifts]);

    const deleteLift = useCallback(async (liftId: string) => {
        if (!mountainId) return;
        await liftApi.deleteLift(mountainId, liftId);
        await fetchLifts();
    }, [mountainId, fetchLifts]);

    return {
        lifts,
        isLoading,
        fetchLifts,
        createLift,
        updateLift,
        deleteLift,
    };
}
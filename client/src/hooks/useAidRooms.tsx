import { useState, useEffect, useCallback } from 'react';
import { aidRoomApi } from '../api/AidRoomAPI';
import type { AidRoom } from 'shared/types';
import { STATUS } from 'shared/types/enums';
import type { AidRoomInputPayload } from '../api/AidRoomAPI';

function toSharedStatus(status: any): STATUS {
    if (Object.values(STATUS).includes(status)) return status as STATUS;
    return STATUS[status as keyof typeof STATUS];
}

export function useAidRooms(mountainId: string | undefined) {
    const [aidRooms, setAidRooms] = useState<AidRoom[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAidRooms = useCallback(async () => {
        if (!mountainId) {
            setAidRooms([]);
            return;
        }
        setIsLoading(true);
        try {
            const data = await aidRoomApi.getAidRooms(mountainId);
            setAidRooms(data);
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchAidRooms();
    }, [fetchAidRooms]);

    const mutateAndRefresh = async (fn: () => Promise<any>) => {
        if (!mountainId) return;
        await fn();
        await fetchAidRooms();
    };

    const createAidRoom = (aidRoom: AidRoomInputPayload) =>
        mutateAndRefresh(() =>
            aidRoomApi.createAidRoom(mountainId!, { ...aidRoom, status: toSharedStatus(aidRoom.status) })
        );

    const updateAidRoom = (aidRoomId: string, updated: Partial<AidRoom>) => {
        if (!mountainId) return;
        const { name, status, latitude, longitude } = updated;
        const payload: Partial<AidRoomInputPayload> = {
            ...(name !== undefined ? { name } : {}),
            ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
            ...(latitude !== undefined ? { latitude: latitude == null ? null : Number(latitude) } : {}),
            ...(longitude !== undefined ? { longitude: longitude == null ? null : Number(longitude) } : {}),
        };
        return mutateAndRefresh(() => aidRoomApi.updateAidRoom(mountainId, aidRoomId, payload));
    };

    const deleteAidRoom = (aidRoomId: string) =>
        mutateAndRefresh(() => aidRoomApi.deleteAidRoom(mountainId!, aidRoomId));

    return { aidRooms, isLoading, fetchAidRooms, createAidRoom, updateAidRoom, deleteAidRoom };
}
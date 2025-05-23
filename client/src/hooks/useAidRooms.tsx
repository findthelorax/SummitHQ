import { useState, useEffect, useCallback } from 'react';
import { aidRoomApi } from '../api/AidRoomAPI';
import type { AidRoom } from 'shared/types';
import { STATUS } from 'shared/types/enums';
import type { AidRoomCreatePayload } from '../api/AidRoomAPI';

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

    const createAidRoom = async (aidRoom: AidRoomCreatePayload) => {
        if (!mountainId) return;
        const payload = {
            ...aidRoom,
            status: toSharedStatus(aidRoom.status),
        };
        await aidRoomApi.createAidRoom(mountainId, payload);
        await fetchAidRooms();
    };

    const updateAidRoom = async (aidRoomId: string, updated: Partial<AidRoom>) => {
        if (!mountainId) return;
        const { name, status, latitude, longitude } = updated;
        const payload: Partial<AidRoomCreatePayload> = {
            ...(name !== undefined ? { name } : {}),
            ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
            ...(latitude !== undefined
                ? { latitude: latitude === null || latitude === undefined ? null : Number(latitude) }
                : {}),
            ...(longitude !== undefined
                ? { longitude: longitude === null || longitude === undefined ? null : Number(longitude) }
                : {}),
        };
        await aidRoomApi.updateAidRoom(mountainId, aidRoomId, payload);
        await fetchAidRooms();
    };

    const deleteAidRoom = async (aidRoomId: string) => {
        if (!mountainId) return;
        await aidRoomApi.deleteAidRoom(mountainId, aidRoomId);
        await fetchAidRooms();
    };

    return { aidRooms, isLoading, fetchAidRooms, createAidRoom, updateAidRoom, deleteAidRoom };
}
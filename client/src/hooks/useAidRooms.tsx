import { useState, useEffect, useCallback } from 'react';
import { aidRoomApi } from '../api/AidRoomAPI';
import type { AidRoomDTO } from '../types/index';
import { STATUS } from '../types/generated-enums';
import type { AidRoomInputPayload } from '../api/AidRoomAPI';

function toSharedStatus(status: any): STATUS {
	if (Object.values(STATUS).includes(status)) return status as STATUS;
	return STATUS[status as keyof typeof STATUS];
}

export function useAidRooms(mountainId: string | undefined) {
	const [aidRooms, setAidRooms] = useState<AidRoomDTO[]>([]);
	const [isLoadingAidRooms, setIsLoadingAidRooms] = useState(false);

	const fetchAidRooms = useCallback(async () => {
		if (!mountainId) {
			setAidRooms([]);
			return;
		}
		setIsLoadingAidRooms(true);
		try {
			let data: AidRoomDTO[];
			data = await aidRoomApi.getAidRooms(mountainId);
			setAidRooms(data);
		} finally {
			setIsLoadingAidRooms(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchAidRooms();
	}, [fetchAidRooms]);

	const createAidRoom = useCallback(
		async (aidRoom: AidRoomInputPayload) => {
			if (!mountainId) return Promise.reject('No mountainId');
			const payload = {
				...aidRoom,
				status: toSharedStatus(aidRoom.status),
			};
			const created = await aidRoomApi.createAidRoom(mountainId, payload);
			await fetchAidRooms();
			return created;
		},
		[mountainId, fetchAidRooms]
	);

    const updateAidRoom = useCallback(
        async (aidRoomId: string, updated: Partial<AidRoomDTO & { areaId?: string }>) => {
            if (!mountainId) return Promise.reject('No mountainId');
            const { name, status, latitude, longitude, areaId } = updated;
            const payload: Partial<AidRoomInputPayload> = {
                ...(name !== undefined ? { name } : {}),
                ...(status !== undefined ? { status: toSharedStatus(status) } : {}),
                ...(latitude !== undefined
                    ? { latitude: latitude === null || latitude === undefined ? null : Number(latitude) }
                    : {}),
                ...(longitude !== undefined
                    ? { longitude: longitude === null || longitude === undefined ? null : Number(longitude) }
                    : {}),
                ...(areaId !== undefined ? { areaId } : {}),
            };
            const updatedAidRoom = await aidRoomApi.updateAidRoom(mountainId, aidRoomId, payload);
            await fetchAidRooms();
            return updatedAidRoom;
        },
        [mountainId, fetchAidRooms]
    );

	const deleteAidRoom = useCallback(
		async (aidRoomId: string) => {
			if (!mountainId) return;
			await aidRoomApi.deleteAidRoom(mountainId, aidRoomId);
			await fetchAidRooms();
		},
		[mountainId, fetchAidRooms]
	);

	return {
		aidRooms,
		isLoadingAidRooms,
		fetchAidRooms,
		createAidRoom,
		updateAidRoom,
		deleteAidRoom,
	};
}

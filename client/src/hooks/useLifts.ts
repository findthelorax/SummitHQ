import { useState, useEffect, useCallback } from 'react';
import { liftApi } from '../api/LiftAPI';
import type { LiftDTO, LiftWithLocation } from '../types/index';
import { LIFT_TYPE, STATUS } from '../types/generated-enums';
import { LiftInputPayload } from '../api/LiftAPI';

function toSharedLiftType(type: any): LIFT_TYPE {
	if (Object.values(LIFT_TYPE).includes(type)) return type as LIFT_TYPE;
	return LIFT_TYPE[type as keyof typeof LIFT_TYPE];
}

function toSharedStatus(status: any): STATUS {
	if (Object.values(STATUS).includes(status)) return status as STATUS;
	return STATUS[status as keyof typeof STATUS];
}

export function useLifts(mountainId: string | undefined) {
	const [lifts, setLifts] = useState<LiftDTO[]>([]);
	const [isLoadingLifts, setIsLoadingLifts] = useState(false);

	const fetchLifts = useCallback(async () => {
		if (!mountainId) {
			setLifts([]);
			return;
		}
		setIsLoadingLifts(true);
		try {
			const data = await liftApi.getLifts(mountainId);
			setLifts(data);
		} finally {
			setIsLoadingLifts(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchLifts();
	}, [fetchLifts]);

	const createLift = useCallback(
		async (lift: LiftInputPayload, areaId?: string) => {
			if (!mountainId) throw new Error('No mountainId provided');
			const payload = {
				...lift,
				type: toSharedLiftType(lift.type),
				status: toSharedStatus(lift.status),
			};
			const created = await liftApi.createLift(mountainId, payload, areaId);
			await fetchLifts();
			if (!created) throw new Error('Lift creation failed');
			return created as LiftWithLocation;
		},
		[mountainId, fetchLifts]
	);

	const updateLift = useCallback(
		async (liftId: string, updated: Partial<LiftInputPayload>) => {
			if (!mountainId) throw new Error('No mountainId provided');
			const { name, type, status, capacity, latitude, longitude, areaId } = updated;
			const payload: Partial<LiftInputPayload> = {
				...(name !== undefined ? { name } : {}),
				...(type !== undefined ? { type: toSharedLiftType(type) } : {}),
				...(status !== undefined ? { status: toSharedStatus(status) } : {}),
				...(capacity !== undefined ? { capacity } : {}),
				...(latitude !== undefined
					? { latitude: latitude === undefined ? undefined : Number(latitude) }
					: {}),
				...(longitude !== undefined
					? { longitude: longitude === undefined ? undefined : Number(longitude) }
					: {}),
				...(areaId !== undefined ? { areaId: areaId ?? undefined } : {}),
			};
			const updatedLift = await liftApi.updateLift(mountainId, liftId, payload);
			await fetchLifts();
			return updatedLift as LiftWithLocation;
		},
		[mountainId, fetchLifts]
	);

	const deleteLift = useCallback(
		async (liftId: string) => {
			if (!mountainId) return;
			await liftApi.deleteLift(mountainId, liftId);
			await fetchLifts();
		},
		[mountainId, fetchLifts]
	);

	return {
		lifts,
		isLoadingLifts,
		fetchLifts,
		createLift,
		updateLift,
		deleteLift,
	};
}

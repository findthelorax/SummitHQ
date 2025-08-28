import { useState, useEffect, useCallback } from 'react';
import { trailApi } from '../api/TrailAPI';
import type { TrailDTO } from '../types/index';
import { TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION } from '../types/generated-enums';
import type { TrailInputPayload } from '../api/TrailAPI';

function toSharedDifficulty(difficulty: any): TRAIL_DIFFICULTY {
	if (Object.values(TRAIL_DIFFICULTY).includes(difficulty)) return difficulty as TRAIL_DIFFICULTY;
	return TRAIL_DIFFICULTY[difficulty as keyof typeof TRAIL_DIFFICULTY];
}

function toSharedStatus(status: any): STATUS {
	if (Object.values(STATUS).includes(status)) return status as STATUS;
	return STATUS[status as keyof typeof STATUS];
}

function toSharedCondition(condition: any): TRAIL_CONDITION {
	if (Object.values(TRAIL_CONDITION).includes(condition)) return condition as TRAIL_CONDITION;
	return TRAIL_CONDITION[condition as keyof typeof TRAIL_CONDITION];
}

export function useTrails(mountainId: string | undefined) {
	const [trails, setTrails] = useState<TrailDTO[]>([]);
	const [isLoadingTrails, setIsLoadingTrails] = useState(false);

	const fetchTrails = useCallback(async () => {
		if (!mountainId) {
			setTrails([]);
			return;
		}
		setIsLoadingTrails(true);
		try {
			let data: TrailDTO[];
			data = await trailApi.getTrails(mountainId);
			setTrails(data);
		} finally {
			setIsLoadingTrails(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchTrails();
	}, [fetchTrails]);

	const createTrail = useCallback(
		async (trail: TrailInputPayload): Promise<TrailDTO> => {
			if (!mountainId) throw new Error('No mountainId');
			const payload = {
				...trail,
				difficulty: toSharedDifficulty(trail.difficulty),
				status: toSharedStatus(trail.status),
				condition: toSharedCondition(trail.condition),
			};
			const created = await trailApi.createTrail(mountainId, payload);
			await fetchTrails();
			return created;
		},
		[mountainId, fetchTrails]
	);

	const updateTrail = useCallback(
		async (trailId: string, updated: Partial<TrailDTO & { areaId?: string }>): Promise<TrailDTO> => {
			if (!mountainId) throw new Error('No mountainId');
			const { name, difficulty, status, length, latitude, longitude, condition, areaId } = updated;
			const payload: Partial<TrailInputPayload> = {
				...(name !== undefined ? { name } : {}),
				...(difficulty !== undefined ? { difficulty: toSharedDifficulty(difficulty) } : {}),
				...(status !== undefined ? { status: toSharedStatus(status) } : {}),
				...(length !== undefined
					? { length: length === null || length === undefined ? undefined : Number(length) }
					: {}),
				...(latitude !== undefined
					? { latitude: latitude === null || latitude === undefined ? undefined : Number(latitude) }
					: {}),
				...(longitude !== undefined
					? { longitude: longitude === null || longitude === undefined ? undefined : Number(longitude) }
					: {}),
				...(condition !== undefined ? { condition: toSharedCondition(condition) } : {}),
				...(areaId !== undefined ? { areaId } : {}),
			};
			const updatedTrail = await trailApi.updateTrail(mountainId, trailId, payload);
			await fetchTrails();
			return updatedTrail;
		},
		[mountainId, fetchTrails]
	);
	
	const deleteTrail = useCallback(
		async (trailId: string) => {
			if (!mountainId) return;
			await trailApi.deleteTrail(mountainId, trailId);
			await fetchTrails();
		},
		[mountainId, fetchTrails]
	);

	return {
		trails,
		isLoadingTrails,
		fetchTrails,
		createTrail,
		updateTrail,
		deleteTrail,
	};
}

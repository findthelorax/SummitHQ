import { useState, useEffect, useCallback } from 'react';
import { trailApi } from '../api/TrailAPI';
import type { Trail } from 'shared/types';
import { TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION } from 'shared/types/enums';
import type { TrailCreatePayload } from '../api/TrailAPI';

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
	const [trails, setTrails] = useState<Trail[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchTrails = useCallback(async () => {
		if (!mountainId) {
			setTrails([]);
			return;
		}
		setIsLoading(true);
		try {
			const data = await trailApi.getTrails(mountainId);
			setTrails(data);
		} finally {
			setIsLoading(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchTrails();
	}, [fetchTrails]);

	const createTrail = async (trail: TrailCreatePayload) => {
		if (!mountainId) return;
		const payload = {
			...trail,
			difficulty: toSharedDifficulty(trail.difficulty),
			status: toSharedStatus(trail.status),
			condition: toSharedCondition(trail.condition),
		};
		await trailApi.createTrail(mountainId, payload);
		await fetchTrails();
	};

	const updateTrail = async (trailId: string, updated: Partial<Trail>) => {
		if (!mountainId) return;
		const { name, difficulty, status, length, latitude, longitude, condition } = updated;
		const payload: Partial<TrailCreatePayload> = {
			...(name !== undefined ? { name } : {}),
			...(difficulty !== undefined ? { difficulty: toSharedDifficulty(difficulty) } : {}),
			...(status !== undefined ? { status: toSharedStatus(status) } : {}),
			...(length !== undefined ? { length } : {}),
			...(latitude !== undefined
				? { latitude: latitude === null || latitude === undefined ? null : Number(latitude) }
				: {}),
			...(longitude !== undefined
				? { longitude: longitude === null || longitude === undefined ? null : Number(longitude) }
				: {}),
			...(condition !== undefined ? { condition: toSharedCondition(condition) } : {}),
		};
		await trailApi.updateTrail(mountainId, trailId, payload);
		await fetchTrails();
	};

	const deleteTrail = async (trailId: string) => {
		if (!mountainId) return;
		await trailApi.deleteTrail(mountainId, trailId);
		await fetchTrails();
	};

	return { trails, isLoading, fetchTrails, createTrail, updateTrail, deleteTrail };
}
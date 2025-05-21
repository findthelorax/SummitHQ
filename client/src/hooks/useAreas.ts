import { useState, useEffect, useCallback } from 'react';
import { areaApi } from '../api/AreaAPI';
import type { Area, AreaWithEntities } from 'shared/types';
import { AREA_TYPE } from 'shared/types/enums';
import type { AreaCreatePayload } from '../api/AreaAPI';

function toSharedAreaType(type: any): AREA_TYPE {
	if (Object.values(AREA_TYPE).includes(type)) return type as AREA_TYPE;
	return AREA_TYPE[type as keyof typeof AREA_TYPE];
}

export function useAreas(mountainId: string | undefined) {
	const [areas, setAreas] = useState<AreaWithEntities[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchAreas = useCallback(async () => {
		if (!mountainId) {
			setAreas([]);
			return;
		}
		setIsLoading(true);
		try {
			const data = await areaApi.getAreas(mountainId);
			setAreas(data as AreaWithEntities[]);
		} finally {
			setIsLoading(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchAreas();
	}, [fetchAreas]);

	const createArea = async (area: AreaCreatePayload) => {
		if (!mountainId) return;
		const payload = { ...area, type: toSharedAreaType(area.type) };
		await areaApi.createArea(mountainId, payload);
		await fetchAreas();
	};

	const updateArea = async (areaId: string, updated: Partial<Area>) => {
		if (!mountainId) return;
		const { name, type, description } = updated;
		const payload: Partial<import('../api/AreaAPI').AreaCreatePayload> = {
			...(name !== undefined ? { name } : {}),
			...(type !== undefined ? { type: type as import('../api/AreaAPI').AreaCreatePayload['type'] } : {}),
			...(description !== undefined ? { description } : {}),
		};
		await areaApi.updateArea(mountainId, areaId, payload);
		await fetchAreas();
	};

	const deleteArea = async (areaId: string) => {
		if (!mountainId) return;
		await areaApi.deleteArea(mountainId, areaId);
		await fetchAreas();
	};

	return { areas, isLoading, fetchAreas, createArea, updateArea, deleteArea };
}

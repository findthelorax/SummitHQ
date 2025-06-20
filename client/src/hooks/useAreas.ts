import { useState, useEffect, useCallback } from 'react';
import { areaApi } from '../api/AreaAPI';
import type { AreaDTO, AreaFull } from '../types/index';
import { AREA_TYPE } from '../types/generated-enums';
import type { AreaInputPayload } from '../api/AreaAPI';

function toSharedAreaType(type: any): AREA_TYPE {
	if (Object.values(AREA_TYPE).includes(type)) return type as AREA_TYPE;
	return AREA_TYPE[type as keyof typeof AREA_TYPE];
}

export function useAreas(mountainId: string | undefined) {
	const [areas, setAreas] = useState<AreaFull[]>([]);
	const [isLoadingAreas, setIsLoadingAreas] = useState(false);

	const fetchAreas = useCallback(async () => {
		if (!mountainId) {
			setAreas([]);
			return;
		}
		setIsLoadingAreas(true);
		try {
			const data = await areaApi.getAreas(mountainId);
			setAreas(data as AreaFull[]);
		} finally {
			setIsLoadingAreas(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchAreas();
	}, [fetchAreas]);

	const createArea = async (area: AreaInputPayload) => {
		if (!mountainId) return;
		const payload = { ...area, type: toSharedAreaType(area.type) };
		await areaApi.createArea(mountainId, payload);
		await fetchAreas();
	};

	const updateArea = async (areaId: string, updated: Partial<AreaDTO>) => {
		if (!mountainId) return;
		const { name, type, description } = updated;
		const payload: Partial<import('../api/AreaAPI').AreaInputPayload> = {
			...(name !== undefined ? { name } : {}),
			...(type !== undefined ? { type: type as import('../api/AreaAPI').AreaInputPayload['type'] } : {}),
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

	return { areas, isLoadingAreas, fetchAreas, createArea, updateArea, deleteArea };
}

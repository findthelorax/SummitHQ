import { useState, useEffect, useCallback } from 'react';
import { equipmentApi } from '../api/EquipmentAPI';
import type { EquipmentDTO, EquipmentWithLocation } from '../types/index';
import { EQUIPMENT_STATUS } from '../types/generated-enums';
import type { EquipmentInputPayload } from '../api/EquipmentAPI';

function toSharedEquipmentStatus(status: any): EQUIPMENT_STATUS {
	if (Object.values(EQUIPMENT_STATUS).includes(status)) return status as EQUIPMENT_STATUS;
	return EQUIPMENT_STATUS[status as keyof typeof EQUIPMENT_STATUS];
}

function normalizeEquipmentPayload(input: any) {
	return {
		...input,
		status: input.status ? toSharedEquipmentStatus(input.status) : EQUIPMENT_STATUS.OPERATIONAL,
		dateAdded: input.dateAdded
			? typeof input.dateAdded === 'string'
				? input.dateAdded
				: input.dateAdded instanceof Date
				? input.dateAdded.toISOString()
				: undefined
			: undefined,
		latitude: input.latitude !== undefined && input.latitude !== null ? Number(input.latitude) : undefined,
		longitude: input.longitude !== undefined && input.longitude !== null ? Number(input.longitude) : undefined,
	};
}

export function useEquipment(defaultMountainId?: string) {
	const [equipment, setEquipment] = useState<EquipmentDTO[]>([]);
	const [isLoadingEquipment, setIsLoadingEquipment] = useState(false);

	const fetchEquipmentByMountain = useCallback(
		async (mountainId = defaultMountainId) => {
			if (!mountainId) {
				setEquipment([]);
				return;
			}
			setIsLoadingEquipment(true);
			try {
				const data = await equipmentApi.getEquipmentByMountain(mountainId);
				setEquipment(data);
			} finally {
				setIsLoadingEquipment(false);
			}
		},
		[defaultMountainId]
	);

	const fetchAllEquipment = useCallback(async () => {
		setIsLoadingEquipment(true);
		try {
			const data = await equipmentApi.getAllEquipment();
			setEquipment(data);
		} finally {
			setIsLoadingEquipment(false);
		}
	}, []);

	useEffect(() => {
		fetchAllEquipment();
	}, [fetchAllEquipment]);

	const createEquipment = useCallback(
		async (
			input: EquipmentInputPayload & { areaId?: string; mountainId?: string }
		): Promise<EquipmentWithLocation> => {
			const mountainId = input.mountainId ?? defaultMountainId;
			if (!mountainId) throw new Error('No mountainId provided');
			const payload = {
				...normalizeEquipmentPayload(input),
				mountainId,
				areaId: input.areaId ?? undefined,
			};
			const created = await equipmentApi.createEquipment(payload);
			await fetchEquipmentByMountain(mountainId);
			return created;
		},
		[fetchEquipmentByMountain, defaultMountainId]
	);

	const updateEquipment = useCallback(
		async (equipmentId: string, updated: Partial<EquipmentInputPayload>): Promise<EquipmentWithLocation> => {
			const mountainId = updated.mountainId ?? defaultMountainId;
			if (!mountainId) throw new Error('No mountainId provided');
			const payload: Partial<EquipmentInputPayload> = normalizeEquipmentPayload(updated);
			const updatedEquipment = await equipmentApi.updateEquipment(equipmentId, payload);
			await fetchEquipmentByMountain(mountainId);
			return updatedEquipment;
		},
		[fetchEquipmentByMountain, defaultMountainId]
	);

	const deleteEquipment = useCallback(
		async (equipmentId: string, mountainId?: string) => {
			const useMountainId = mountainId ?? defaultMountainId;
			if (!useMountainId) return;
			await equipmentApi.deleteEquipment(equipmentId);
			await fetchEquipmentByMountain(useMountainId);
		},
		[fetchEquipmentByMountain, defaultMountainId]
	);

	return {
		equipment,
		isLoadingEquipment,
		fetchAllEquipment,
		fetchEquipmentByMountain,
		createEquipment,
		updateEquipment,
		deleteEquipment,
	};
}

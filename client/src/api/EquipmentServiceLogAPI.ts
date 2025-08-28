import { apiClient } from './apiConfig';
import type { EquipmentServiceLogDTO } from '../types/index';

export type EquipmentServiceLogInputPayload = Omit<EquipmentServiceLogDTO, 'id' | 'createdAt' | 'updatedAt'>;

export const equipmentServiceLogApi = {
    async create(mountainId: string, equipmentId: string, payload: EquipmentServiceLogInputPayload) {
        const res = await apiClient.post<EquipmentServiceLogDTO>(
            `/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs`,
            payload
        );
        return res.data;
    },

    async getAll(mountainId: string, equipmentId: string) {
        const res = await apiClient.get<EquipmentServiceLogDTO[]>(
            `/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs`
        );
        return res.data;
    },

    async getById(mountainId: string, equipmentId: string, logId: string) {
        const res = await apiClient.get<EquipmentServiceLogDTO>(
            `/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs/${logId}`
        );
        return res.data;
    },

    async update(mountainId: string, equipmentId: string, logId: string, updated: Partial<EquipmentServiceLogInputPayload>) {
        const res = await apiClient.put<EquipmentServiceLogDTO>(
            `/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs/${logId}`,
            updated
        );
        return res.data;
    },

    async delete(mountainId: string, equipmentId: string, logId: string) {
        const res = await apiClient.delete<EquipmentServiceLogDTO>(
            `/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs/${logId}`
        );
        return res.data;
    },
};
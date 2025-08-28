import { apiClient } from './apiConfig';
import type { IncidentEquipmentUsageLogDTO } from '../types/index';

export const incidentEquipmentUsageLogApi = {
    async create(
        mountainId: string,
        incidentId: string,
        log: Omit<
            IncidentEquipmentUsageLogDTO,
            'id' | 'mountainId' | 'incidentId' | 'equipment' | 'incident' | 'mountain' | 'createdAt' | 'updatedAt'
        >
    ) {
        const res = await apiClient.post<IncidentEquipmentUsageLogDTO>(
            `/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs`,
            log
        );
        return res.data;
    },

    async getAll(mountainId: string, incidentId: string) {
        const res = await apiClient.get<IncidentEquipmentUsageLogDTO[]>(
            `/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs`
        );
        return res.data;
    },

    async getById(mountainId: string, incidentId: string, logId: string) {
        const res = await apiClient.get<IncidentEquipmentUsageLogDTO>(
            `/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs/${logId}`
        );
        return res.data;
    },

    async update(mountainId: string, incidentId: string, logId: string, updated: Partial<IncidentEquipmentUsageLogDTO>) {
        const res = await apiClient.put<IncidentEquipmentUsageLogDTO>(
            `/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs/${logId}`,
            updated
        );
        return res.data;
    },

    async delete(mountainId: string, incidentId: string, logId: string) {
        const res = await apiClient.delete<IncidentEquipmentUsageLogDTO>(
            `/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs/${logId}`
        );
        return res.data;
    },
};
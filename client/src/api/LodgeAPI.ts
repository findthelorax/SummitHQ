import { apiClient } from './apiConfig';
import type { LodgeDTO } from '../types/index';
import type { STATUS } from '../types/generated-enums';

export type LodgeInputPayload = {
    name: string;
    capacity: number | 0;
    latitude: number | null;
    longitude: number | null;
    status: STATUS;
    areaId?: string | undefined;
};

export const lodgeApi = {
    async createLodge(mountainId: string, lodge: LodgeInputPayload, areaId?: string) {
        const payload = areaId ? { ...lodge, areaId } : lodge;
        const res = await apiClient.post<LodgeDTO>(`/api/mountains/${mountainId}/lodges`, payload);
        return res.data;
    },

    async getLodges(mountainId: string) {
        const res = await apiClient.get<LodgeDTO[]>(`/api/mountains/${mountainId}/lodges`);
        return res.data;
    },

    async getAllLodges() {
        const res = await apiClient.get<LodgeDTO[]>(`/api/lodges`);
        return res.data;
    },

    async getLodge(mountainId: string, lodgeId: string) {
        const res = await apiClient.get<LodgeDTO>(`/api/mountains/${mountainId}/lodges/${lodgeId}`);
        return res.data;
    },

    async updateLodge(mountainId: string, lodgeId: string, updated: Partial<LodgeInputPayload>) {
        const res = await apiClient.put<LodgeDTO>(`/api/mountains/${mountainId}/lodges/${lodgeId}`, updated);
        return res.data;
    },

    async deleteLodge(mountainId: string, lodgeId: string) {
        const res = await apiClient.delete<LodgeDTO>(`/api/mountains/${mountainId}/lodges/${lodgeId}`);
        return res.data;
    },
};
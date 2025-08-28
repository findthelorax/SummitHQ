import { apiClient } from './apiConfig';
import type { AreaFull } from '../types/index';
import type { AREA_TYPE } from '../types/generated-enums';

export type AreaInputPayload = {
    name: string;
    type: (typeof AREA_TYPE)[keyof typeof AREA_TYPE];
    description?: string | null;
};

export const areaApi = {
    async createArea(mountainId: string, area: AreaInputPayload) {
        const res = await apiClient.post<AreaFull>(`/api/mountains/${mountainId}/areas`, area);
        return res.data;
    },

    async getAreas(mountainId: string) {
        const res = await apiClient.get<AreaFull[]>(`/api/mountains/${mountainId}/areas`);
        return res.data;
    },

    async getArea(mountainId: string, areaId: string) {
        const res = await apiClient.get<AreaFull>(`/api/mountains/${mountainId}/areas/${areaId}`);
        return res.data;
    },

    async updateArea(mountainId: string, areaId: string, updated: Partial<AreaInputPayload>) {
        const res = await apiClient.put<AreaFull>(`/api/mountains/${mountainId}/areas/${areaId}`, updated);
        return res.data;
    },

    async deleteArea(mountainId: string, areaId: string) {
        const res = await apiClient.delete<AreaFull>(`/api/mountains/${mountainId}/areas/${areaId}`);
        return res.data;
    },

    async addAreaToLocation(locationId: string, areaId: string) {
        const res = await apiClient.post(`/api/locations/${locationId}/area`, { areaId });
        return res.data;
    },

    async updateAreaInLocation(locationId: string, mountainId: string, updated: Partial<AreaInputPayload>) {
        const res = await apiClient.put(`/api/locations/${locationId}/area`, { mountainId, ...updated });
        return res.data;
    },

    async removeAreaFromLocation(locationId: string) {
        const res = await apiClient.delete(`/api/locations/${locationId}/area`);
        return res.data;
    },
};
import { apiClient } from './apiConfig';
import type { HoursDTO } from '../types/index';

export const hoursApi = {
    async createHours(
        mountainId: string,
        hours: Omit<HoursDTO, 'id' | 'mountainId' | 'location' | 'createdAt' | 'updatedAt'>
    ) {
        const res = await apiClient.post<HoursDTO>(`/api/mountains/${mountainId}/hours`, hours);
        return res.data;
    },

    async getHours(mountainId: string) {
        const res = await apiClient.get<HoursDTO[]>(`/api/mountains/${mountainId}/hours`);
        return res.data;
    },

    async getHour(mountainId: string, hoursId: string) {
        const res = await apiClient.get<HoursDTO>(`/api/mountains/${mountainId}/hours/${hoursId}`);
        return res.data;
    },

    async updateHours(mountainId: string, hoursId: string, updated: Partial<HoursDTO>) {
        const res = await apiClient.put<HoursDTO>(`/api/mountains/${mountainId}/hours/${hoursId}`, updated);
        return res.data;
    },

    async deleteHours(mountainId: string, hoursId: string) {
        const res = await apiClient.delete<HoursDTO>(`/api/mountains/${mountainId}/hours/${hoursId}`);
        return res.data;
    },
};
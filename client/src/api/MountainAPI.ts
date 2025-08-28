import { apiClient } from './apiConfig';
import type { MountainFull, WeatherDTO, EmployeeMountainAssignmentDTO, LocationDTO, LiftCheckDTO, EquipmentDTO } from '../types/index';

export type MountainInputPayload = {
    name: string;
    city: string;
    state: string;
    latitude: number | null;
    longitude: number | null;
    height: number | null;
    phoneNumber?: string;
    address?: string;
    zipcode?: string;
    openingDate?: string;
    closingDate?: string;
};

export const mountainApi = {
    async createMountain(mountain: MountainInputPayload) {
        const res = await apiClient.post<MountainFull>(`/api/mountains`, mountain);
        return res.data;
    },

    async getAllMountains() {
        const res = await apiClient.get<MountainFull[]>(`/api/mountains`);
        return res.data;
    },

    async getMountain(mountainId: string) {
        const res = await apiClient.get<MountainFull>(`/api/mountains/${mountainId}`);
        return res.data;
    },

    async updateMountain(mountainId: string, updated: Partial<MountainInputPayload>) {
        const res = await apiClient.put<MountainFull>(`/api/mountains/${mountainId}`, updated);
        return res.data;
    },

    async deleteMountain(mountainId: string) {
        const res = await apiClient.delete<MountainFull>(`/api/mountains/${mountainId}`);
        return res.data;
    },

    async deleteAllMountains() {
        const res = await apiClient.delete<MountainFull[]>(`/api/mountains`);
        return res.data;
    },

    async getWeather(mountainId: string, params?: { limit?: number; offset?: number; order?: 'asc' | 'desc' }) {
        const res = await apiClient.get<WeatherDTO[]>(`/api/mountains/${mountainId}/weather`, { params });
        return res.data;
    },

    async getEmployees(mountainId: string, params?: { limit?: number; offset?: number }) {
        const res = await apiClient.get<EmployeeMountainAssignmentDTO[]>(`/api/mountains/${mountainId}/employees`, { params });
        return res.data;
    },

    async getEquipment(mountainId: string, params?: { limit?: number; offset?: number }) {
        const res = await apiClient.get<EquipmentDTO[]>(`/api/mountains/${mountainId}/equipment`, { params });
        return res.data;
    },

    async getLocations(mountainId: string, params?: { limit?: number; offset?: number }) {
        const res = await apiClient.get<LocationDTO[]>(`/api/mountains/${mountainId}/locations`, { params });
        return res.data;
    },

    async getLiftChecks(mountainId: string, params?: { limit?: number; offset?: number }) {
        const res = await apiClient.get<LiftCheckDTO[]>(`/api/mountains/${mountainId}/lift-checks`, { params });
        return res.data;
    },
};
import { apiClient } from './apiConfig';
import type { HutDTO, HutCheckDTO } from '../types/index';
import type { STATUS } from '../types/generated-enums';

export type HutInputPayload = {
    name: string;
    status: STATUS;
    latitude: number | null;
    longitude: number | null;
    areaId?: string | null;
};

export type HutCheckInputPayload = {
    employeeId: string;
    equipmentIssues: boolean;
    equipmentNotes: string;
    paperworkStocked: boolean;
    notes: string;
};

export const hutApi = {
    async createHut(mountainId: string, hut: HutInputPayload, areaId?: string) {
        const payload = areaId ? { ...hut, areaId } : hut;
        const res = await apiClient.post<HutDTO>(`/api/mountains/${mountainId}/huts`, payload);
        return res.data;
    },

    async getHuts(mountainId: string) {
        const res = await apiClient.get<HutDTO[]>(`/api/mountains/${mountainId}/huts`);
        return res.data;
    },

    async getAllHuts() {
        const res = await apiClient.get<HutDTO[]>(`/api/huts`);
        return res.data;
    },

    async getHut(mountainId: string, hutId: string) {
        const res = await apiClient.get<HutDTO>(`/api/mountains/${mountainId}/huts/${hutId}`);
        return res.data;
    },

    async updateHut(mountainId: string, hutId: string, updated: Partial<HutInputPayload>) {
        const res = await apiClient.put<HutDTO>(`/api/mountains/${mountainId}/huts/${hutId}`, updated);
        return res.data;
    },

    async deleteHut(mountainId: string, hutId: string) {
        const res = await apiClient.delete<HutDTO>(`/api/mountains/${mountainId}/huts/${hutId}`);
        return res.data;
    },

    async createHutCheck(mountainId: string, hutId: string, check: HutCheckInputPayload) {
        const res = await apiClient.post<HutCheckDTO>(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks`, check);
        return res.data;
    },

    async getHutChecks(mountainId: string, hutId: string) {
        const res = await apiClient.get<HutCheckDTO[]>(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks`);
        return res.data;
    },

    async getHutCheck(mountainId: string, hutId: string, hutCheckId: string) {
        const res = await apiClient.get<HutCheckDTO>(
            `/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`
        );
        return res.data;
    },

    async updateHutCheck(mountainId: string, hutId: string, hutCheckId: string, updated: Partial<HutCheckDTO>) {
        const res = await apiClient.put<HutCheckDTO>(
            `/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`,
            updated
        );
        return res.data;
    },

    async deleteHutCheck(mountainId: string, hutId: string, hutCheckId: string) {
        const res = await apiClient.delete<HutCheckDTO>(
            `/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`
        );
        return res.data;
    },

    async getAllHutChecks(mountainId: string) {
        const res = await apiClient.get<HutCheckDTO[]>(`/api/mountains/${mountainId}/hutChecks`);
        return res.data;
    },
};
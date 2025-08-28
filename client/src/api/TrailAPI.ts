import { apiClient } from './apiConfig';
import type { TrailDTO, TrailCheckDTO } from '../types/index';
import type { TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION } from '../types/generated-enums';

export type TrailInputPayload = {
    name: string;
    status: STATUS;
    difficulty: TRAIL_DIFFICULTY;
    condition: TRAIL_CONDITION;
    length: number | 0;
    latitude: number | null;
    longitude: number | null;
    areaId?: string | undefined;
};

export type TrailCheckInputPayload = {
    employeeId: string;
    condition: TRAIL_CONDITION;
    status: STATUS;
    hazards: boolean;
    snowmaking: boolean;
    notes?: string | null;
};

export const trailApi = {
    async createTrail(mountainId: string, trail: TrailInputPayload, areaId?: string) {
        const payload = areaId ? { ...trail, areaId } : trail;
        const res = await apiClient.post<TrailDTO>(`/api/mountains/${mountainId}/trails`, payload);
        return res.data;
    },

    async getTrails(mountainId: string) {
        const res = await apiClient.get<TrailDTO[]>(`/api/mountains/${mountainId}/trails`);
        return res.data;
    },

    async getAllTrails() {
        const res = await apiClient.get<TrailDTO[]>(`/api/trails`);
        return res.data;
    },

    async getTrail(mountainId: string, trailId: string) {
        const res = await apiClient.get<TrailDTO>(`/api/mountains/${mountainId}/trails/${trailId}`);
        return res.data;
    },

    async updateTrail(mountainId: string, trailId: string, updated: Partial<TrailInputPayload>) {
        const res = await apiClient.put<TrailDTO>(`/api/mountains/${mountainId}/trails/${trailId}`, updated);
        return res.data;
    },

    async deleteTrail(mountainId: string, trailId: string) {
        const res = await apiClient.delete<TrailDTO>(`/api/mountains/${mountainId}/trails/${trailId}`);
        return res.data;
    },

    async createTrailCheck(mountainId: string, trailId: string, check: TrailCheckInputPayload) {
        const res = await apiClient.post<TrailCheckDTO>(
            `/api/mountains/${mountainId}/trails/${trailId}/trailChecks`,
            check
        );
        return res.data;
    },

    async getTrailChecks(mountainId: string, trailId: string) {
        const res = await apiClient.get<TrailCheckDTO[]>(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks`);
        return res.data;
    },

    async getTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
        const res = await apiClient.get<TrailCheckDTO>(
            `/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`
        );
        return res.data;
    },

    async updateTrailCheck(
        mountainId: string,
        trailId: string,
        trailCheckId: string,
        updated: Partial<TrailCheckInputPayload>
    ) {
        const res = await apiClient.put<TrailCheckDTO>(
            `/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`,
            updated
        );
        return res.data;
    },

    async deleteTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
        const res = await apiClient.delete<TrailCheckDTO>(
            `/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`
        );
        return res.data;
    },

    async getAllTrailChecks(mountainId: string) {
        const res = await apiClient.get<TrailCheckDTO[]>(`/api/mountains/${mountainId}/trailChecks`);
        return res.data;
    },
};
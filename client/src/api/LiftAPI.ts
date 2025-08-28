import { apiClient } from './apiConfig';
import type { LiftDTO, LiftCheckDTO } from '../types/index';
import type { LIFT_TYPE, STATUS } from '../types/generated-enums';

export type LiftInputPayload = {
    name: string;
    type: LIFT_TYPE;
    status: STATUS;
    capacity: number | 0;
    latitude: number | null;
    longitude: number | null;
    areaId?: string | null;
};

export type LiftCheckInputPayload = {
    employeeId: string;
    hazards: boolean;
    status: STATUS;
    notes?: string | null;
};

export const liftApi = {
    async createLift(mountainId: string, lift: LiftInputPayload, areaId?: string) {
        const payload = areaId ? { ...lift, areaId } : lift;
        const res = await apiClient.post<LiftDTO>(`/api/mountains/${mountainId}/lifts`, payload);
        return res.data;
    },

    async getLifts(mountainId: string) {
        const res = await apiClient.get<LiftDTO[]>(`/api/mountains/${mountainId}/lifts`);
        return res.data;
    },

    async getAllLifts() {
        const res = await apiClient.get<LiftDTO[]>(`/api/lifts`);
        return res.data;
    },

    async getLift(mountainId: string, liftId: string) {
        const res = await apiClient.get<LiftDTO>(`/api/mountains/${mountainId}/lifts/${liftId}`);
        return res.data;
    },

    async updateLift(mountainId: string, liftId: string, updated: Partial<LiftInputPayload>) {
        const res = await apiClient.put<LiftDTO>(`/api/mountains/${mountainId}/lifts/${liftId}`, updated);
        return res.data;
    },
    
    async deleteLift(mountainId: string, liftId: string) {
        const res = await apiClient.delete<LiftDTO>(`/api/mountains/${mountainId}/lifts/${liftId}`);
        return res.data;
    },

    async createLiftCheck(mountainId: string, liftId: string, check: LiftCheckInputPayload) {
        const res = await apiClient.post<LiftCheckDTO>(
            `/api/mountains/${mountainId}/lifts/${liftId}/liftChecks`,
            check
        );
        return res.data;
    },
    
    async getLiftChecks(mountainId: string, liftId: string) {
        const res = await apiClient.get<LiftCheckDTO[]>(`/api/mountains/${mountainId}/lifts/${liftId}/liftChecks`);
        return res.data;
    },
    
    async getLiftCheck(mountainId: string, liftId: string, liftCheckId: string) {
        const res = await apiClient.get<LiftCheckDTO>(
            `/api/mountains/${mountainId}/lifts/${liftId}/liftChecks/${liftCheckId}`
        );
        return res.data;
    },
    
    async updateLiftCheck(
        mountainId: string,
        liftId: string,
        liftCheckId: string,
        updates: Partial<LiftCheckInputPayload>
    ) {
        const res = await apiClient.put<LiftCheckDTO>(
            `/api/mountains/${mountainId}/lifts/${liftId}/liftChecks/${liftCheckId}`,
            updates
        );
        return res.data;
    },
    
    async deleteLiftCheck(mountainId: string, liftId: string, liftCheckId: string) {
        const res = await apiClient.delete<LiftCheckDTO>(
            `/api/mountains/${mountainId}/lifts/${liftId}/liftChecks/${liftCheckId}`
        );
        return res.data;
    },

    async getAllLiftChecks(mountainId: string) {
        const res = await apiClient.get<LiftCheckDTO[]>(`/api/mountains/${mountainId}/liftChecks`);
        return res.data;
    },
};
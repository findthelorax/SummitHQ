import { apiClient } from './apiConfig';
import type { EquipmentDTO } from '../types/index';

export type EquipmentInputPayload = {
    name: string;
    type: string;
    number?: number;
    status?: string;
    description?: string;
    picture?: string;
    cost?: number | 0;
    latitude?: number | null;
    longitude?: number | null;
    mountainId?: string;
    locationId?: string | null;
    dateAdded?: string | Date;
    areaId?: string | undefined;
};

export const equipmentApi = {
    async createEquipment(equipment: EquipmentInputPayload) {
        const res = await apiClient.post<EquipmentDTO>(`/api/equipment`, equipment);
        return res.data;
    },

    async getAllEquipment() {
        const res = await apiClient.get<EquipmentDTO[]>(`/api/equipment`);
        return res.data;
    },

    async getEquipment(equipmentId: string) {
        const res = await apiClient.get<EquipmentDTO>(`/api/equipment/${equipmentId}`);
        return res.data;
    },

    async updateEquipment(equipmentId: string, updated: Partial<EquipmentInputPayload>) {
        const res = await apiClient.put<EquipmentDTO>(`/api/equipment/${equipmentId}`, updated);
        return res.data;
    },

    async deleteEquipment(equipmentId: string) {
        const res = await apiClient.delete(`/api/equipment/${equipmentId}`);
        return res.data;
    },

    async getEquipmentByMountain(mountainId: string) {
        const res = await apiClient.get<EquipmentDTO[]>(`/api/equipment?mountainId=${mountainId}`);
        return res.data;
    },

    async assignToMountain(equipmentId: string, mountainId: string) {
        const res = await apiClient.post<EquipmentDTO>(`/api/equipment/${equipmentId}/assign/${mountainId}`);
        return res.data;
    },

    async removeFromMountain(equipmentId: string, mountainId: string) {
        const res = await apiClient.delete<EquipmentDTO>(`/api/equipment/${equipmentId}/remove/${mountainId}`);
        return res.data;
    },

    async assignToLocation(equipmentId: string, mountainId: string, locationId: string) {
        const res = await apiClient.post<EquipmentDTO>(
            `/api/equipment/${equipmentId}/assign-location/${mountainId}/${locationId}`
        );
        return res.data;
    },

    async removeFromLocation(equipmentId: string, mountainId: string, locationId: string) {
        const res = await apiClient.delete<EquipmentDTO>(
            `/api/equipment/${equipmentId}/remove-location/${mountainId}/${locationId}`
        );
        return res.data;
    },

    async moveToLocation(equipmentId: string, mountainId: string, newLocationId: string) {
        const res = await apiClient.post<EquipmentDTO>(
            `/api/equipment/${equipmentId}/move-location/${mountainId}`,
            { newLocationId }
        );
        return res.data;
    },

    async createEquipmentCheck(equipmentId: string, payload: any) {
        const res = await apiClient.post(`/api/equipment/${equipmentId}/equipmentChecks`, payload);
        return res.data;
    },

    async getEquipmentChecks(equipmentId: string) {
        const res = await apiClient.get(`/api/equipment/${equipmentId}/equipmentChecks`);
        return res.data;
    },

    async getEquipmentCheck(equipmentId: string, equipmentCheckId: string) {
        const res = await apiClient.get(`/api/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`);
        return res.data;
    },

    async updateEquipmentCheck(equipmentId: string, equipmentCheckId: string, payload: any) {
        const res = await apiClient.put(`/api/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`, payload);
        return res.data;
    },

    async deleteEquipmentCheck(equipmentId: string, equipmentCheckId: string) {
        const res = await apiClient.delete(`/api/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`);
        return res.data;
    },
};
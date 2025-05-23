import axios from 'axios';
import type { Equipment } from 'shared/types';

type EquipmentInputPayload = {
    name: string;
    type: string;
    number?: number;
    status?: string;
    description?: string;
    picture?: string;
    cost?: number;
    latitude?: number | null;
    longitude?: number | null;
    mountainId?: string;
    locationId?: string | null;
};

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export const equipmentApi = {
    async createEquipment(equipment: EquipmentInputPayload) {
        const res = await axios.post<Equipment>(url(`/api/equipment`), equipment);
        console.log("🚀 ~ createEquipment ~ equipment:", equipment)
        return res.data;
    },

    async getAllEquipment() {
        const res = await axios.get<Equipment[]>(url(`/api/equipment`));
        return res.data;
    },

    async getEquipment(equipmentId: string) {
        const res = await axios.get<Equipment>(url(`/api/equipment/${equipmentId}`));
        return res.data;
    },

    async updateEquipment(equipmentId: string, updated: Partial<EquipmentInputPayload>) {
        const res = await axios.put<Equipment>(url(`/api/equipment/${equipmentId}`), updated);
        return res.data;
    },

    async deleteEquipment(equipmentId: string) {
        const res = await axios.delete(url(`/api/equipment/${equipmentId}`));
        return res.data;
    },

    async getEquipmentByMountain(mountainId: string) {
        const res = await axios.get<Equipment[]>(url(`/api/equipment?mountainId=${mountainId}`));
        return res.data;
    },

    async assignToMountain(equipmentId: string, mountainId: string) {
        const res = await axios.post<Equipment>(url(`/api/equipment/${equipmentId}/assign/${mountainId}`));
        return res.data;
    },

    async removeFromMountain(equipmentId: string, mountainId: string) {
        const res = await axios.delete<Equipment>(url(`/api/equipment/${equipmentId}/remove/${mountainId}`));
        return res.data;
    },

    async assignToLocation(equipmentId: string, mountainId: string, locationId: string) {
        const res = await axios.post<Equipment>(
            url(`/api/equipment/${equipmentId}/assign-location/${mountainId}/${locationId}`)
        );
        return res.data;
    },

    async removeFromLocation(equipmentId: string, mountainId: string, locationId: string) {
        const res = await axios.delete<Equipment>(
            url(`/api/equipment/${equipmentId}/remove-location/${mountainId}/${locationId}`)
        );
        return res.data;
    },

    async moveToLocation(equipmentId: string, mountainId: string, newLocationId: string) {
        const res = await axios.post<Equipment>(
            url(`/api/equipment/${equipmentId}/move-location/${mountainId}`),
            { newLocationId }
        );
        return res.data;
    },

    async createEquipmentCheck(equipmentId: string, payload: any) {
        const res = await axios.post(url(`/api/equipment/${equipmentId}/equipmentChecks`), payload);
        return res.data;
    },

    async getEquipmentChecks(equipmentId: string) {
        const res = await axios.get(url(`/api/equipment/${equipmentId}/equipmentChecks`));
        return res.data;
    },

    async getEquipmentCheck(equipmentId: string, equipmentCheckId: string) {
        const res = await axios.get(url(`/api/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`));
        return res.data;
    },

    async updateEquipmentCheck(equipmentId: string, equipmentCheckId: string, payload: any) {
        const res = await axios.put(url(`/api/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`), payload);
        return res.data;
    },

    async deleteEquipmentCheck(equipmentId: string, equipmentCheckId: string) {
        const res = await axios.delete(url(`/api/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`));
        return res.data;
    },
};
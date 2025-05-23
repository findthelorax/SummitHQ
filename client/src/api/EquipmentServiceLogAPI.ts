import axios from 'axios';
import type { EquipmentServiceLog } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export type EquipmentServiceLogCreatePayload = Omit<EquipmentServiceLog, 'id' | 'createdAt' | 'updatedAt'>;

export const equipmentServiceLogApi = {
    async create(mountainId: string, equipmentId: string, payload: EquipmentServiceLogCreatePayload) {
        const res = await axios.post<EquipmentServiceLog>(
            url(`/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs`),
            payload
        );
        return res.data;
    },

    async getAll(mountainId: string, equipmentId: string) {
        const res = await axios.get<EquipmentServiceLog[]>(
            url(`/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs`)
        );
        return res.data;
    },

    async getById(mountainId: string, equipmentId: string, logId: string) {
        const res = await axios.get<EquipmentServiceLog>(
            url(`/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs/${logId}`)
        );
        return res.data;
    },

    async update(mountainId: string, equipmentId: string, logId: string, updated: Partial<EquipmentServiceLogCreatePayload>) {
        const res = await axios.put(
            url(`/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs/${logId}`),
            updated
        );
        return res.data;
    },

    async delete(mountainId: string, equipmentId: string, logId: string) {
        const res = await axios.delete(
            url(`/api/mountains/${mountainId}/equipment/${equipmentId}/service-logs/${logId}`)
        );
        return res.data;
    },
};
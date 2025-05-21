import axios from 'axios';
import type { Area } from 'shared/types';
import type { AREA_TYPE } from 'shared/types/enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type AreaCreatePayload = {
    name: string;
    type: AREA_TYPE;
    description?: string | null;
};

export const areaApi = {
    async createArea(mountainId: string, area: AreaCreatePayload) {
        const res = await axios.post<Area>(url(`/api/mountains/${mountainId}/areas`), area);
        return res.data;
    },

    async getAreas(mountainId: string) {
        const res = await axios.get<Area[]>(url(`/api/mountains/${mountainId}/areas`));
        return res.data;
    },

    async getArea(mountainId: string, areaId: string) {
        const res = await axios.get<Area>(url(`/api/mountains/${mountainId}/areas/${areaId}`));
        return res.data;
    },

    async updateArea(mountainId: string, areaId: string, updated: Partial<AreaCreatePayload>) {
        const res = await axios.put<Area>(url(`/api/mountains/${mountainId}/areas/${areaId}`), updated);
        return res.data;
    },

    async deleteArea(mountainId: string, areaId: string) {
        const res = await axios.delete<Area>(url(`/api/mountains/${mountainId}/areas/${areaId}`));
        return res.data;
    },
};
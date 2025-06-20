import axios from 'axios';
import type { LodgeDTO } from '../types/index';
import type { STATUS } from '../types/generated-enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type LodgeInputPayload = {
	name: string;
	capacity: number | 0;
	latitude: number | null;
	longitude: number | null;
	status: STATUS;
	areaId?: string | undefined;
};

export const lodgeApi = {
	async createLodge(mountainId: string, lodge: LodgeInputPayload, areaId?: string) {
		const payload = areaId ? { ...lodge, areaId } : lodge;
		const res = await axios.post<LodgeDTO>(url(`/api/mountains/${mountainId}/lodges`), payload);
		return res.data;
	},

	async getLodges(mountainId: string) {
		const res = await axios.get<LodgeDTO[]>(url(`/api/mountains/${mountainId}/lodges`));
		return res.data;
	},

	async getAllLodges() {
		const res = await axios.get<LodgeDTO[]>(url(`/api/lodges`));
		return res.data;
	},

	async getLodge(mountainId: string, lodgeId: string) {
		const res = await axios.get<LodgeDTO>(url(`/api/mountains/${mountainId}/lodges/${lodgeId}`));
		return res.data;
	},

	async updateLodge(mountainId: string, lodgeId: string, updated: Partial<LodgeInputPayload>) {
		const res = await axios.put<LodgeDTO>(url(`/api/mountains/${mountainId}/lodges/${lodgeId}`), updated);
		return res.data;
	},

	async deleteLodge(mountainId: string, lodgeId: string) {
		const res = await axios.delete<LodgeDTO>(url(`/api/mountains/${mountainId}/lodges/${lodgeId}`));
		return res.data;
	},
};

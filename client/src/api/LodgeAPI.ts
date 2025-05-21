import axios from 'axios';
import type { Lodge } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const lodgeApi = {
	async createLodge(mountainId: string, lodge: Omit<Lodge, 'id' | 'mountainId'>) {
		const res = await axios.post<Lodge>(url(`/api/mountains/${mountainId}/lodges`), lodge);
		return res.data;
	},

	async getLodges(mountainId: string) {
		const res = await axios.get<Lodge[]>(url(`/api/mountains/${mountainId}/lodges`));
		return res.data;
	},

	async getLodge(mountainId: string, lodgeId: string) {
		const res = await axios.get<Lodge>(url(`/api/mountains/${mountainId}/lodges/${lodgeId}`));
		return res.data;
	},

	async updateLodge(mountainId: string, lodgeId: string, updated: Partial<Lodge>) {
		const res = await axios.put<Lodge>(url(`/api/mountains/${mountainId}/lodges/${lodgeId}`), updated);
		return res.data;
	},

	async deleteLodge(mountainId: string, lodgeId: string) {
		const res = await axios.delete<Lodge>(url(`/api/mountains/${mountainId}/lodges/${lodgeId}`));
		return res.data;
	},
};
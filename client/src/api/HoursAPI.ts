import axios from 'axios';
import type { Hours } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const hoursApi = {
	async createHours(
		mountainId: string,
		hours: Omit<Hours, 'id' | 'mountainId' | 'location' | 'createdAt' | 'updatedAt'>
	) {
		const res = await axios.post<Hours>(url(`/api/mountains/${mountainId}/hours`), hours);
		return res.data;
	},

	async getHours(mountainId: string) {
		const res = await axios.get<Hours[]>(url(`/api/mountains/${mountainId}/hours`));
		return res.data;
	},

	async getHour(mountainId: string, hoursId: string) {
		const res = await axios.get<Hours>(url(`/api/mountains/${mountainId}/hours/${hoursId}`));
		return res.data;
	},

	async updateHours(mountainId: string, hoursId: string, updated: Partial<Hours>) {
		const res = await axios.put<Hours>(url(`/api/mountains/${mountainId}/hours/${hoursId}`), updated);
		return res.data;
	},

	async deleteHours(mountainId: string, hoursId: string) {
		const res = await axios.delete<Hours>(url(`/api/mountains/${mountainId}/hours/${hoursId}`));
		return res.data;
	},
};
import axios from 'axios';
import type { Hut, HutCheck } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const hutApi = {
	// Hut endpoints
	async createHut(mountainId: string, hut: Omit<Hut, 'id' | 'mountainId' | 'hutChecks'>) {
		const res = await axios.post<Hut>(url(`/api/mountains/${mountainId}/huts`), hut);
		return res.data;
	},

	async getHuts(mountainId: string) {
		const res = await axios.get<Hut[]>(url(`/api/mountains/${mountainId}/huts`));
		return res.data;
	},

	async getHut(mountainId: string, hutId: string) {
		const res = await axios.get<Hut>(url(`/api/mountains/${mountainId}/huts/${hutId}`));
		return res.data;
	},

	async updateHut(mountainId: string, hutId: string, updated: Partial<Hut>) {
		const res = await axios.put<Hut>(url(`/api/mountains/${mountainId}/huts/${hutId}`), updated);
		return res.data;
	},

	async deleteHut(mountainId: string, hutId: string) {
		const res = await axios.delete<Hut>(url(`/api/mountains/${mountainId}/huts/${hutId}`));
		return res.data;
	},

	// HutCheck endpoints
	async createHutCheck(
		mountainId: string,
		hutId: string,
		check: Omit<HutCheck, 'id' | 'mountainId' | 'hutId' | 'createdAt' | 'updatedAt'>
	) {
		const res = await axios.post<HutCheck>(url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks`), check);
		return res.data;
	},

	async getHutChecks(mountainId: string, hutId: string) {
		const res = await axios.get<HutCheck[]>(url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks`));
		return res.data;
	},

	async getHutCheck(mountainId: string, hutId: string, hutCheckId: string) {
		const res = await axios.get<HutCheck>(
			url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`)
		);
		return res.data;
	},

	async updateHutCheck(mountainId: string, hutId: string, hutCheckId: string, updated: Partial<HutCheck>) {
		const res = await axios.put<HutCheck>(
			url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`),
			updated
		);
		return res.data;
	},

	async deleteHutCheck(mountainId: string, hutId: string, hutCheckId: string) {
		const res = await axios.delete<HutCheck>(
			url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`)
		);
		return res.data;
	},
};
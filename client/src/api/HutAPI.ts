import axios from 'axios';
import type { HutDTO, HutCheckDTO } from '../types/index';
import type { STATUS } from '../types/generated-enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type HutInputPayload = {
	name: string;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
	areaId?: string | null;
};

export const hutApi = {
	async createHut(mountainId: string, hut: HutInputPayload, areaId?: string) {
		const payload = areaId ? { ...hut, areaId } : hut;
		const res = await axios.post<HutDTO>(url(`/api/mountains/${mountainId}/huts`), payload);
		return res.data;
	},

	async getHuts(mountainId: string) {
		const res = await axios.get<HutDTO[]>(url(`/api/mountains/${mountainId}/huts`));
		return res.data;
	},

	async getAllHuts() {
		const res = await axios.get<HutDTO[]>(url(`/api/huts`));
		return res.data;
	},

	async getHut(mountainId: string, hutId: string) {
		const res = await axios.get<HutDTO>(url(`/api/mountains/${mountainId}/huts/${hutId}`));
		return res.data;
	},

	async updateHut(mountainId: string, hutId: string, updated: Partial<HutInputPayload>) {
		const res = await axios.put<HutDTO>(url(`/api/mountains/${mountainId}/huts/${hutId}`), updated);
		return res.data;
	},

	async deleteHut(mountainId: string, hutId: string) {
		const res = await axios.delete<HutDTO>(url(`/api/mountains/${mountainId}/huts/${hutId}`));
		return res.data;
	},

	async createHutCheck(
		mountainId: string,
		hutId: string,
		check: Omit<HutCheckDTO, 'id' | 'mountainId' | 'hutId' | 'createdAt' | 'updatedAt'>
	) {
		const res = await axios.post<HutCheckDTO>(url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks`), check);
		return res.data;
	},

	async getHutChecks(mountainId: string, hutId: string) {
		const res = await axios.get<HutCheckDTO[]>(url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks`));
		return res.data;
	},

	async getHutCheck(mountainId: string, hutId: string, hutCheckId: string) {
		const res = await axios.get<HutCheckDTO>(
			url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`)
		);
		return res.data;
	},

	async updateHutCheck(mountainId: string, hutId: string, hutCheckId: string, updated: Partial<HutCheckDTO>) {
		const res = await axios.put<HutCheckDTO>(
			url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`),
			updated
		);
		return res.data;
	},

	async deleteHutCheck(mountainId: string, hutId: string, hutCheckId: string) {
		const res = await axios.delete<HutCheckDTO>(
			url(`/api/mountains/${mountainId}/huts/${hutId}/hutChecks/${hutCheckId}`)
		);
		return res.data;
	},
};

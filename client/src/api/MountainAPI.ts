import axios from 'axios';
import type { MountainFull } from '../types/index';

export type MountainInputPayload = {
	name: string;
	city: string;
	state: string;
	latitude: number | null;
	longitude: number | null;
	height: number | null;
	phoneNumber?: string;
	address?: string;
	zipcode?: string;
	openingDate?: string;
	closingDate?: string;
};

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const mountainApi = {
	async createMountain(mountain: MountainInputPayload) {
		const res = await axios.post<MountainFull>(url(`/api/mountains`), mountain);
		return res.data;
	},

	async getAllMountains() {
		const res = await axios.get<MountainFull[]>(url(`/api/mountains`));
		return res.data;
	},

	async getMountain(mountainId: string) {
		const res = await axios.get<MountainFull>(url(`/api/mountains/${mountainId}`));
		return res.data;
	},

	async updateMountain(mountainId: string, updated: Partial<MountainInputPayload>) {
		const res = await axios.put<MountainFull>(url(`/api/mountains/${mountainId}`), updated);
		return res.data;
	},

	async deleteMountain(mountainId: string) {
		const res = await axios.delete<MountainFull>(url(`/api/mountains/${mountainId}`));
		return res.data;
	},

	async deleteAllMountains() {
		const res = await axios.delete<MountainFull[]>(url(`/api/mountains`));
		return res.data;
	},
};

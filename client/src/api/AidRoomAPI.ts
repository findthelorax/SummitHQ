import axios from 'axios';
import type { AidRoom, AidRoomCheck } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const aidRoomApi = {
	// AidRoom endpoints
	async createAidRoom(mountainId: string, aidRoom: Omit<AidRoom, 'id' | 'mountainId' | 'aidRoomChecks'>) {
		const res = await axios.post<AidRoom>(url(`/api/mountains/${mountainId}/aidRooms`), aidRoom);
		return res.data;
	},

	async getAidRooms(mountainId: string) {
		const res = await axios.get<AidRoom[]>(url(`/api/mountains/${mountainId}/aidRooms`));
		return res.data;
	},

	async getAidRoom(mountainId: string, aidRoomId: string) {
		const res = await axios.get<AidRoom>(url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`));
		return res.data;
	},

	async updateAidRoom(mountainId: string, aidRoomId: string, updated: Partial<AidRoom>) {
		const res = await axios.put<AidRoom>(url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`), updated);
		return res.data;
	},

	async deleteAidRoom(mountainId: string, aidRoomId: string) {
		const res = await axios.delete<AidRoom>(url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`));
		return res.data;
	},

	// AidRoomCheck endpoints
	async createAidRoomCheck(
		mountainId: string,
		aidRoomId: string,
		check: Omit<AidRoomCheck, 'id' | 'mountainId' | 'aidRoomId' | 'createdAt' | 'updatedAt'>
	) {
		const res = await axios.post<AidRoomCheck>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks`),
			check
		);
		return res.data;
	},

	async getAidRoomChecks(mountainId: string, aidRoomId: string) {
		const res = await axios.get<AidRoomCheck[]>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks`)
		);
		return res.data;
	},

	async getAidRoomCheck(mountainId: string, aidRoomId: string, aidRoomCheckId: string) {
		const res = await axios.get<AidRoomCheck>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`)
		);
		return res.data;
	},

	async updateAidRoomCheck(
		mountainId: string,
		aidRoomId: string,
		aidRoomCheckId: string,
		updated: Partial<AidRoomCheck>
	) {
		const res = await axios.put<AidRoomCheck>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`),
			updated
		);
		return res.data;
	},

	async deleteAidRoomCheck(mountainId: string, aidRoomId: string, aidRoomCheckId: string) {
		const res = await axios.delete<AidRoomCheck>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`)
		);
		return res.data;
	},
};
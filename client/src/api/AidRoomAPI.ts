import axios from 'axios';
import type { AidRoomDTO, AidRoomCheckDTO } from '../types/index';
import type { STATUS } from '../types/generated-enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type AidRoomInputPayload = {
	name: string;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
	areaId?: string;
};

export const aidRoomApi = {
	async createAidRoom(mountainId: string, aidRoom: AidRoomInputPayload, areaId?: string) {
		const payload = areaId ? { ...aidRoom, areaId } : aidRoom;
		const res = await axios.post<AidRoomDTO>(url(`/api/mountains/${mountainId}/aidRooms`), payload);
		return res.data;
	},

	async getAidRooms(mountainId: string) {
		const res = await axios.get<AidRoomDTO[]>(url(`/api/mountains/${mountainId}/aidRooms`));
		return res.data;
	},

	async getAllAidRooms() {
		const res = await axios.get<AidRoomDTO[]>(url(`/api/aidRooms`));
		return res.data;
	},

	async getAidRoom(mountainId: string, aidRoomId: string) {
		const res = await axios.get<AidRoomDTO>(url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`));
		return res.data;
	},

	async updateAidRoom(mountainId: string, aidRoomId: string, updated: Partial<AidRoomInputPayload>) {
		const res = await axios.put<AidRoomDTO>(url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`), updated);
		return res.data;
	},

	async deleteAidRoom(mountainId: string, aidRoomId: string) {
		const res = await axios.delete<AidRoomDTO>(url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}`));
		return res.data;
	},

	async createAidRoomCheck(
		mountainId: string,
		aidRoomId: string,
		check: Omit<AidRoomCheckDTO, 'id' | 'mountainId' | 'aidRoomId' | 'createdAt' | 'updatedAt'>
	) {
		const res = await axios.post<AidRoomCheckDTO>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks`),
			check
		);
		return res.data;
	},

	async getAidRoomChecks(mountainId: string, aidRoomId: string) {
		const res = await axios.get<AidRoomCheckDTO[]>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks`)
		);
		return res.data;
	},

	async getAidRoomCheck(mountainId: string, aidRoomId: string, aidRoomCheckId: string) {
		const res = await axios.get<AidRoomCheckDTO>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`)
		);
		return res.data;
	},

	async updateAidRoomCheck(
		mountainId: string,
		aidRoomId: string,
		aidRoomCheckId: string,
		updated: Partial<AidRoomCheckDTO>
	) {
		const res = await axios.put<AidRoomCheckDTO>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`),
			updated
		);
		return res.data;
	},

	async deleteAidRoomCheck(mountainId: string, aidRoomId: string, aidRoomCheckId: string) {
		const res = await axios.delete<AidRoomCheckDTO>(
			url(`/api/mountains/${mountainId}/aidRooms/${aidRoomId}/aidRoomChecks/${aidRoomCheckId}`)
		);
		return res.data;
	},
};

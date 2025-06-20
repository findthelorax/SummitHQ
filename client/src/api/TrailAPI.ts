import axios from 'axios';
import type { TrailDTO, TrailCheckDTO } from '../types/index';
import type { TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION } from '../types/generated-enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type TrailInputPayload = {
	name: string;
	status: STATUS;
	difficulty: TRAIL_DIFFICULTY;
	condition: TRAIL_CONDITION;
	length: number | 0;
	latitude: number | null;
	longitude: number | null;
	areaId?: string | undefined;
};

export type TrailCheckInputPayload = {
	employeeId: string;
	trailId: string;
	recordedAt: string;
	notes?: string;
};

export const trailApi = {
	async createTrail(mountainId: string, trail: TrailInputPayload, areaId?: string) {
		const payload = areaId ? { ...trail, areaId } : trail;
		const res = await axios.post<TrailDTO>(url(`/api/mountains/${mountainId}/trails`), payload);
		return res.data;
	},

	async getTrails(mountainId: string) {
		const res = await axios.get<TrailDTO[]>(url(`/api/mountains/${mountainId}/trails`));
		return res.data;
	},

	async getAllTrails() {
		const res = await axios.get<TrailDTO[]>(url(`/api/trails`));
		return res.data;
	},

	async getTrail(mountainId: string, trailId: string) {
		const res = await axios.get<TrailDTO>(url(`/api/mountains/${mountainId}/trails/${trailId}`));
		return res.data;
	},

	async updateTrail(mountainId: string, trailId: string, updated: Partial<TrailInputPayload>) {
		const res = await axios.put<TrailDTO>(url(`/api/mountains/${mountainId}/trails/${trailId}`), updated);
		return res.data;
	},

	async deleteTrail(mountainId: string, trailId: string) {
		const res = await axios.delete<TrailDTO>(url(`/api/mountains/${mountainId}/trails/${trailId}`));
		return res.data;
	},

	async createTrailCheck(mountainId: string, trailId: string, check: TrailCheckInputPayload) {
		const res = await axios.post<TrailCheckDTO>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks`),
			check
		);
		return res.data;
	},

	async getTrailChecks(mountainId: string, trailId: string) {
		const res = await axios.get<TrailCheckDTO[]>(url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks`));
		return res.data;
	},

	async getTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
		const res = await axios.get<TrailCheckDTO>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`)
		);
		return res.data;
	},

	async updateTrailCheck(
		mountainId: string,
		trailId: string,
		trailCheckId: string,
		updated: Partial<TrailCheckInputPayload>
	) {
		const res = await axios.put<TrailCheckDTO>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`),
			updated
		);
		return res.data;
	},

	async deleteTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
		const res = await axios.delete<TrailCheckDTO>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`)
		);
		return res.data;
	},
};

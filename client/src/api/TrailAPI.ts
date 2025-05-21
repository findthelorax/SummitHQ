import axios from 'axios';
import type { Trail, TrailCheck, TRAIL_CONDITION, TRAIL_DIFFICULTY, STATUS } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type TrailCreatePayload = {
	name: string;
	difficulty: TRAIL_DIFFICULTY;
	status: STATUS;
	length: number | null;
	latitude: number | null;
	longitude: number | null;
	condition: TRAIL_CONDITION;
};

export type TrailCheckCreatePayload = Omit<
	TrailCheck,
	'id' | 'mountainId' | 'trailId' | 'employeeId' | 'createdAt' | 'updatedAt' | 'mountain' | 'trail' | 'employee'
>;

export const trailApi = {
	async createTrail(mountainId: string, trail: TrailCreatePayload) {
		const res = await axios.post<Trail>(url(`/api/mountains/${mountainId}/trails`), trail);
		return res.data;
	},

	async getTrails(mountainId: string) {
		const res = await axios.get<Trail[]>(url(`/api/mountains/${mountainId}/trails`));
		return res.data;
	},

	async getTrail(mountainId: string, trailId: string) {
		const res = await axios.get<Trail>(url(`/api/mountains/${mountainId}/trails/${trailId}`));
		return res.data;
	},

	async updateTrail(mountainId: string, trailId: string, updated: Partial<TrailCreatePayload>) {
		const res = await axios.put<Trail>(url(`/api/mountains/${mountainId}/trails/${trailId}`), updated);
		return res.data;
	},

	async deleteTrail(mountainId: string, trailId: string) {
		const res = await axios.delete<Trail>(url(`/api/mountains/${mountainId}/trails/${trailId}`));
		return res.data;
	},

	async createTrailCheck(mountainId: string, trailId: string, check: TrailCheckCreatePayload) {
		const res = await axios.post<TrailCheck>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks`),
			check
		);
		return res.data;
	},

	async getTrailChecks(mountainId: string, trailId: string) {
		const res = await axios.get<TrailCheck[]>(url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks`));
		return res.data;
	},

	async getTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
		const res = await axios.get<TrailCheck>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`)
		);
		return res.data;
	},

	async updateTrailCheck(
		mountainId: string,
		trailId: string,
		trailCheckId: string,
		updated: Partial<TrailCheckCreatePayload>
	) {
		const res = await axios.put<TrailCheck>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`),
			updated
		);
		return res.data;
	},

	async deleteTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
		const res = await axios.delete<TrailCheck>(
			url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`)
		);
		return res.data;
	},
};

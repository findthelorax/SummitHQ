import axios from 'axios';
import type { Lift, LiftCheck } from 'shared/types';
import type { LIFT_TYPE, STATUS } from 'shared/types/enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type LiftCreatePayload = {
    name: string;
    type: LIFT_TYPE;
    status: STATUS;
    capacity: number | null;
    latitude: number | null;
    longitude: number | null;
};

export type LiftUpdatePayload = Partial<LiftCreatePayload>;
export type LiftCheckCreatePayload = Omit<LiftCheck, 'id' | 'mountainId' | 'liftId' | 'createdAt' | 'updatedAt'>;

export const liftApi = {
	async createLift(mountainId: string, lift: LiftCreatePayload) {
		const res = await axios.post<Lift>(url(`/api/mountains/${mountainId}/lifts`), lift);
		return res.data;
	},
	async getLifts(mountainId: string) {
		const res = await axios.get<Lift[]>(url(`/api/mountains/${mountainId}/lifts`));
		return res.data;
	},
	async getLift(mountainId: string, liftId: string) {
		const res = await axios.get<Lift>(url(`/api/mountains/${mountainId}/lifts/${liftId}`));
		return res.data;
	},
	async updateLift(mountainId: string, liftId: string, updates: LiftUpdatePayload) {
		const res = await axios.put<Lift>(url(`/api/mountains/${mountainId}/lifts/${liftId}`), updates);
		return res.data;
	},
	async deleteLift(mountainId: string, liftId: string) {
		const res = await axios.delete<Lift>(url(`/api/mountains/${mountainId}/lifts/${liftId}`));
		return res.data;
	},

	async createLiftCheck(mountainId: string, liftId: string, check: LiftCheckCreatePayload) {
		const res = await axios.post<LiftCheck>(url(`/api/mountains/${mountainId}/lifts/${liftId}/liftChecks`), check);
		return res.data;
	},
	async getLiftChecks(mountainId: string, liftId: string) {
		const res = await axios.get<LiftCheck[]>(url(`/api/mountains/${mountainId}/lifts/${liftId}/liftChecks`));
		return res.data;
	},
	async getLiftCheck(mountainId: string, liftId: string, liftCheckId: string) {
		const res = await axios.get<LiftCheck>(
			url(`/api/mountains/${mountainId}/lifts/${liftId}/liftChecks/${liftCheckId}`)
		);
		return res.data;
	},
	async updateLiftCheck(
		mountainId: string,
		liftId: string,
		liftCheckId: string,
		updates: Partial<LiftCheckCreatePayload>
	) {
		const res = await axios.put<LiftCheck>(
			url(`/api/mountains/${mountainId}/lifts/${liftId}/liftChecks/${liftCheckId}`),
			updates
		);
		return res.data;
	},
	async deleteLiftCheck(mountainId: string, liftId: string, liftCheckId: string) {
		const res = await axios.delete<LiftCheck>(
			url(`/api/mountains/${mountainId}/lifts/${liftId}/liftChecks/${liftCheckId}`)
		);
		return res.data;
	},
};
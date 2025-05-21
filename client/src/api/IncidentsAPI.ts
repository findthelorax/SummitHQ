import axios from 'axios';
import type { Incident, Employee } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const incidentApi = {
	async createIncident(
		mountainId: string,
		incident: Omit<Incident, 'id' | 'mountainId' | 'employees' | 'incidentEquipmentUsageLog'>
	) {
		const res = await axios.post<Incident>(url(`/api/mountains/${mountainId}/incidents`), incident);
		return res.data;
	},

	async assignEmployee(mountainId: string, incidentId: string, employeeId: string) {
		const res = await axios.patch<Incident>(
			url(`/api/mountains/${mountainId}/incidents/${incidentId}/assign-employee`),
			{ employeeId }
		);
		return res.data;
	},

	async updateAssignedEmployee(mountainId: string, incidentId: string, employeeId: string) {
		const res = await axios.put<Incident>(
			url(`/api/mountains/${mountainId}/incidents/${incidentId}/update-employee`),
			{ employeeId }
		);
		return res.data;
	},

	async getIncidents(mountainId: string) {
		const res = await axios.get<Incident[]>(url(`/api/mountains/${mountainId}/incidents`));
		return res.data;
	},

	async getIncident(mountainId: string, incidentId: string) {
		const res = await axios.get<Incident>(url(`/api/mountains/${mountainId}/incidents/${incidentId}`));
		return res.data;
	},

	async updateIncident(mountainId: string, incidentId: string, updated: Partial<Incident>) {
		const res = await axios.put<Incident>(url(`/api/mountains/${mountainId}/incidents/${incidentId}`), updated);
		return res.data;
	},

	async deleteIncident(mountainId: string, incidentId: string) {
		const res = await axios.delete<Incident>(url(`/api/mountains/${mountainId}/incidents/${incidentId}`));
		return res.data;
	},
};
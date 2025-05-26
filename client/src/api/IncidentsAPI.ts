import axios from 'axios';
import type { Incident, Employee } from 'shared/types';
import { INCIDENT_STATUS } from 'shared/types/enums';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export type IncidentInputPayload = {
	title: string;
	description?: string;
	location?: string;
	status?: INCIDENT_STATUS;
	callTime?: string;
	onSceneTime?: string;
	stableTime?: string;
	transportTime?: string;
	dryRun?: boolean;
	employees?: Employee[];
	incidentEquipmentUsageLog?: {
		equipmentId: string;
		quantity: number;
	}[];
};

function toIncidentStatus(status: any): INCIDENT_STATUS {
	if (Object.values(INCIDENT_STATUS).includes(status)) return status as INCIDENT_STATUS;
	return INCIDENT_STATUS[status as keyof typeof INCIDENT_STATUS] ?? INCIDENT_STATUS.UNKNOWN;
}

export const incidentApi = {
	async createIncident(mountainId: string, incident: IncidentInputPayload) {
		const payload = {
			...incident,
			status: incident.status ? toIncidentStatus(incident.status) : INCIDENT_STATUS.REPORTED,
		};
		const res = await axios.post<Incident>(url(`/api/mountains/${mountainId}/incidents`), payload);
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

	async updateIncident(mountainId: string, incidentId: string, updated: Partial<IncidentInputPayload>) {
		const payload = {
			...updated,
			...(updated.status ? { status: toIncidentStatus(updated.status) } : {}),
		};
		const res = await axios.put<Incident>(url(`/api/mountains/${mountainId}/incidents/${incidentId}`), payload);
		return res.data;
	},

	async deleteIncident(mountainId: string, incidentId: string) {
		const res = await axios.delete(url(`/api/mountains/${mountainId}/incidents/${incidentId}`));
		return res.data;
	},
};

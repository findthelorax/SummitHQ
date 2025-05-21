import axios from 'axios';
import type { IncidentEquipmentUsageLog } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const incidentEquipmentUsageLogApi = {
	async create(
		mountainId: string,
		incidentId: string,
		log: Omit<
			IncidentEquipmentUsageLog,
			'id' | 'mountainId' | 'incidentId' | 'equipment' | 'incident' | 'mountain' | 'createdAt' | 'updatedAt'
		>
	) {
		const res = await axios.post<IncidentEquipmentUsageLog>(
			url(`/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs`),
			log
		);
		return res.data;
	},

	async getAll(mountainId: string, incidentId: string) {
		const res = await axios.get<IncidentEquipmentUsageLog[]>(
			url(`/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs`)
		);
		return res.data;
	},

	async getById(mountainId: string, incidentId: string, logId: string) {
		const res = await axios.get<IncidentEquipmentUsageLog>(
			url(`/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs/${logId}`)
		);
		return res.data;
	},

	async update(mountainId: string, incidentId: string, logId: string, updated: Partial<IncidentEquipmentUsageLog>) {
		const res = await axios.put<IncidentEquipmentUsageLog>(
			url(`/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs/${logId}`),
			updated
		);
		return res.data;
	},

	async delete(mountainId: string, incidentId: string, logId: string) {
		const res = await axios.delete<IncidentEquipmentUsageLog>(
			url(`/api/mountains/${mountainId}/incidents/${incidentId}/equipmentUsageLogs/${logId}`)
		);
		return res.data;
	},
};
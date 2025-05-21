import axios from 'axios';
import type { Equipment, EquipmentCheck } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const equipmentApi = {
	// Equipment endpoints
	async createEquipment(
		mountainId: string,
		equipment: Omit<
			Equipment,
			| 'id'
			| 'mountainId'
			| 'equipmentChecks'
			| 'equipmentServiceLogs'
			| 'incidentEquipmentUsageLogs'
			| 'mountain'
			| 'location'
		>
	) {
		const res = await axios.post<Equipment>(url(`/api/mountains/${mountainId}/equipment`), equipment);
		return res.data;
	},

	async getEquipments(mountainId: string) {
		const res = await axios.get<Equipment[]>(url(`/api/mountains/${mountainId}/equipment`));
		return res.data;
	},

	async getEquipment(mountainId: string, equipmentId: string) {
		const res = await axios.get<Equipment>(url(`/api/mountains/${mountainId}/equipment/${equipmentId}`));
		return res.data;
	},

	async updateEquipment(mountainId: string, equipmentId: string, updated: Partial<Equipment>) {
		const res = await axios.put<Equipment>(url(`/api/mountains/${mountainId}/equipment/${equipmentId}`), updated);
		return res.data;
	},

	async deleteEquipment(mountainId: string, equipmentId: string) {
		const res = await axios.delete<Equipment>(url(`/api/mountains/${mountainId}/equipment/${equipmentId}`));
		return res.data;
	},

	// EquipmentCheck endpoints
	async createEquipmentCheck(
		mountainId: string,
		equipmentId: string,
		check: Omit<
			EquipmentCheck,
			| 'id'
			| 'mountainId'
			| 'equipmentId'
			| 'employeeId'
			| 'createdAt'
			| 'updatedAt'
			| 'mountain'
			| 'equipment'
			| 'employee'
		>
	) {
		const res = await axios.post<EquipmentCheck>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/equipmentChecks`),
			check
		);
		return res.data;
	},

	async getEquipmentChecks(mountainId: string, equipmentId: string) {
		const res = await axios.get<EquipmentCheck[]>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/equipmentChecks`)
		);
		return res.data;
	},

	async getEquipmentCheck(mountainId: string, equipmentId: string, equipmentCheckId: string) {
		const res = await axios.get<EquipmentCheck>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`)
		);
		return res.data;
	},

	async updateEquipmentCheck(
		mountainId: string,
		equipmentId: string,
		equipmentCheckId: string,
		updated: Partial<EquipmentCheck>
	) {
		const res = await axios.put<EquipmentCheck>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`),
			updated
		);
		return res.data;
	},

	async deleteEquipmentCheck(mountainId: string, equipmentId: string, equipmentCheckId: string) {
		const res = await axios.delete<EquipmentCheck>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/equipmentChecks/${equipmentCheckId}`)
		);
		return res.data;
	},
};
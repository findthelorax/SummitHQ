import axios from 'axios';
import type { EquipmentServiceLog } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const equipmentServiceLogApi = {
	async create(
		mountainId: string,
		equipmentId: string,
		log: Omit<
			EquipmentServiceLog,
			| 'id'
			| 'mountainId'
			| 'equipmentId'
			| 'employeeId'
			| 'createdAt'
			| 'updatedAt'
			| 'mountain'
			| 'employee'
			| 'equipment'
		>
	) {
		const res = await axios.post<EquipmentServiceLog>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/serviceLogs`),
			log
		);
		return res.data;
	},

	async getAll(mountainId: string, equipmentId: string) {
		const res = await axios.get<EquipmentServiceLog[]>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/serviceLogs`)
		);
		return res.data;
	},

	async getById(mountainId: string, equipmentId: string, logId: string) {
		const res = await axios.get<EquipmentServiceLog>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/serviceLogs/${logId}`)
		);
		return res.data;
	},

	async update(mountainId: string, equipmentId: string, logId: string, updated: Partial<EquipmentServiceLog>) {
		const res = await axios.put<EquipmentServiceLog>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/serviceLogs/${logId}`),
			updated
		);
		return res.data;
	},

	async delete(mountainId: string, equipmentId: string, logId: string) {
		const res = await axios.delete<EquipmentServiceLog>(
			url(`/api/mountains/${mountainId}/equipment/${equipmentId}/serviceLogs/${logId}`)
		);
		return res.data;
	},
};
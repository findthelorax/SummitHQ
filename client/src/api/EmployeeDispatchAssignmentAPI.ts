import axios from 'axios';
import type { DispatcherAssignment } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const dispatchAssignmentApi = {
	async createAssignment(
		employeeId: string,
		assignment: Omit<DispatcherAssignment, 'id' | 'employeeId' | 'mountain' | 'employee'>
	) {
		const res = await axios.post<DispatcherAssignment>(
			url(`/api/employees/${employeeId}/dispatchAssignments`),
			assignment
		);
		return res.data;
	},

	async getAssignments(employeeId: string) {
		const res = await axios.get<DispatcherAssignment[]>(url(`/api/employees/${employeeId}/dispatchAssignments`));
		return res.data;
	},

	async getAssignment(employeeId: string, dispatchAssignmentId: string) {
		const res = await axios.get<DispatcherAssignment>(
			url(`/api/employees/${employeeId}/dispatchAssignments/${dispatchAssignmentId}`)
		);
		return res.data;
	},

	async updateAssignment(employeeId: string, dispatchAssignmentId: string, updated: Partial<DispatcherAssignment>) {
		const res = await axios.put<DispatcherAssignment>(
			url(`/api/employees/${employeeId}/dispatchAssignments/${dispatchAssignmentId}`),
			updated
		);
		return res.data;
	},

	async deleteAssignment(employeeId: string, dispatchAssignmentId: string) {
		const res = await axios.delete<DispatcherAssignment>(
			url(`/api/employees/${employeeId}/dispatchAssignments/${dispatchAssignmentId}`)
		);
		return res.data;
	},
};
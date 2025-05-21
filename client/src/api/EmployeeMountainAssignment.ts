import axios from 'axios';
import type { EmployeeMountainAssignment } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const employeeMountainAssignmentApi = {
	async createAssignment(
		employeeId: string,
		assignment: Omit<EmployeeMountainAssignment, 'id' | 'employeeId' | 'mountain' | 'employee'>
	) {
		const res = await axios.post<EmployeeMountainAssignment>(
			url(`/api/employees/${employeeId}/mountainAssignments`),
			assignment
		);
		return res.data;
	},

	async getAssignments(employeeId: string) {
		const res = await axios.get<EmployeeMountainAssignment[]>(
			url(`/api/employees/${employeeId}/mountainAssignments`)
		);
		return res.data;
	},

	async getAssignment(employeeId: string, mountainAssignmentId: string) {
		const res = await axios.get<EmployeeMountainAssignment>(
			url(`/api/employees/${employeeId}/mountainAssignments/${mountainAssignmentId}`)
		);
		return res.data;
	},

	async updateAssignment(
		employeeId: string,
		mountainAssignmentId: string,
		updated: Partial<EmployeeMountainAssignment>
	) {
		const res = await axios.put<EmployeeMountainAssignment>(
			url(`/api/employees/${employeeId}/mountainAssignments/${mountainAssignmentId}`),
			updated
		);
		return res.data;
	},

	async deleteAssignment(employeeId: string, mountainAssignmentId: string) {
		const res = await axios.delete<EmployeeMountainAssignment>(
			url(`/api/employees/${employeeId}/mountainAssignments/${mountainAssignmentId}`)
		);
		return res.data;
	},
};
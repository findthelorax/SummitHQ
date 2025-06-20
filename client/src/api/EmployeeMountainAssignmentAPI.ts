import axios from 'axios';
import type { EmployeeMountainAssignmentDTO } from '../types/index';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export type EmployeeMountainAssignmentInputPayload = {
    mountainId: string;
    assignedAt?: string;
};

export const employeeMountainAssignmentApi = {
    async createAssignment(employeeId: string, payload: EmployeeMountainAssignmentInputPayload) {
        const res = await axios.post<EmployeeMountainAssignmentDTO>(
            url(`/api/employees/${employeeId}/mountain-assignments`),
            payload
        );
        return res.data;
    },

    async getAssignments() {
        const res = await axios.get<EmployeeMountainAssignmentDTO[]>(url(`/api/employees/mountain-assignments`));
        return res.data;
    },

    async getAssignment(employeeId: string, mountainAssignmentId: string) {
        const res = await axios.get<EmployeeMountainAssignmentDTO>(
            url(`/api/employees/${employeeId}/mountain-assignments/${mountainAssignmentId}`)
        );
        return res.data;
    },

    async updateAssignment(employeeId: string, mountainAssignmentId: string, updated: Partial<EmployeeMountainAssignmentInputPayload>) {
        const res = await axios.put(
            url(`/api/employees/${employeeId}/mountain-assignments/${mountainAssignmentId}`),
            updated
        );
        return res.data;
    },

    async deleteAssignment(employeeId: string, mountainAssignmentId: string) {
        const res = await axios.delete(
            url(`/api/employees/${employeeId}/mountain-assignments/${mountainAssignmentId}`)
        );
        return res.data;
    },
};
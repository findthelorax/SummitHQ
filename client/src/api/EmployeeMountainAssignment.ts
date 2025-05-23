import axios from 'axios';
import type { EmployeeMountainAssignment } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export type EmployeeMountainAssignmentCreatePayload = {
    mountainId: string;
    assignedAt?: string; // ISO string, optional (backend may set)
};

export const employeeMountainAssignmentApi = {
    async createAssignment(employeeId: string, payload: EmployeeMountainAssignmentCreatePayload) {
        const res = await axios.post<EmployeeMountainAssignment>(
            url(`/api/employees/${employeeId}/mountain-assignments`),
            payload
        );
        return res.data;
    },

    async getAssignments() {
        const res = await axios.get<EmployeeMountainAssignment[]>(url(`/api/employees/mountain-assignments`));
        return res.data;
    },

    async getAssignment(employeeId: string, mountainAssignmentId: string) {
        const res = await axios.get<EmployeeMountainAssignment>(
            url(`/api/employees/${employeeId}/mountain-assignments/${mountainAssignmentId}`)
        );
        return res.data;
    },

    async updateAssignment(employeeId: string, mountainAssignmentId: string, updated: Partial<EmployeeMountainAssignmentCreatePayload>) {
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
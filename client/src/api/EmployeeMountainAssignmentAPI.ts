import { apiClient } from './apiConfig';
import type { EmployeeMountainAssignmentDTO } from '../types/index';

export type EmployeeMountainAssignmentInputPayload = {
    mountainId: string;
    assignedAt?: string;
};

export const employeeMountainAssignmentApi = {
    async createAssignment(employeeId: string, payload: EmployeeMountainAssignmentInputPayload) {
        const res = await apiClient.post<EmployeeMountainAssignmentDTO>(
            `/api/employees/${employeeId}/mountain-assignments`,
            payload
        );
        return res.data;
    },

    async getAssignments() {
        const res = await apiClient.get<EmployeeMountainAssignmentDTO[]>(`/api/employees/mountain-assignments`);
        return res.data;
    },

    async getAssignment(employeeId: string, mountainAssignmentId: string) {
        const res = await apiClient.get<EmployeeMountainAssignmentDTO>(
            `/api/employees/${employeeId}/mountain-assignments/${mountainAssignmentId}`
        );
        return res.data;
    },

    async updateAssignment(employeeId: string, mountainAssignmentId: string, updated: Partial<EmployeeMountainAssignmentInputPayload>) {
        const res = await apiClient.put<EmployeeMountainAssignmentDTO>(
            `/api/employees/${employeeId}/mountain-assignments/${mountainAssignmentId}`,
            updated
        );
        return res.data;
    },

    async deleteAssignment(employeeId: string, mountainAssignmentId: string) {
        const res = await apiClient.delete<EmployeeMountainAssignmentDTO>(
            `/api/employees/${employeeId}/mountain-assignments/${mountainAssignmentId}`
        );
        return res.data;
    },
};
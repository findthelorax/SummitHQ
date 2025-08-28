import { apiClient } from './apiConfig';
import type { DispatcherAssignmentDTO } from '../types/index';

export type EmployeeDispatchAssignmentInputPayload = {
    mountainId: string;
};

export const employeeDispatchAssignmentApi = {
    async createAssignment(employeeId: string, payload: EmployeeDispatchAssignmentInputPayload) {
        const res = await apiClient.post<DispatcherAssignmentDTO>(
            `/api/employees/${employeeId}/dispatch-assignments`,
            payload
        );
        return res.data;
    },

    async getAssignments() {
        const res = await apiClient.get<DispatcherAssignmentDTO[]>(`/api/employees/dispatch-assignments`);
        return res.data;
    },

    async getAssignment(employeeId: string, dispatchAssignmentId: string) {
        const res = await apiClient.get<DispatcherAssignmentDTO>(
            `/api/employees/${employeeId}/dispatch-assignments/${dispatchAssignmentId}`
        );
        return res.data;
    },

    async updateAssignment(employeeId: string, dispatchAssignmentId: string, updated: Partial<EmployeeDispatchAssignmentInputPayload>) {
        const res = await apiClient.put<DispatcherAssignmentDTO>(
            `/api/employees/${employeeId}/dispatch-assignments/${dispatchAssignmentId}`,
            updated
        );
        return res.data;
    },

    async deleteAssignment(employeeId: string, dispatchAssignmentId: string) {
        const res = await apiClient.delete<DispatcherAssignmentDTO>(
            `/api/employees/${employeeId}/dispatch-assignments/${dispatchAssignmentId}`
        );
        return res.data;
    },
};
import axios from 'axios';
import type { DispatcherAssignment } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export type EmployeeDispatchAssignmentCreatePayload = {
    mountainId: string;
};

export const employeeDispatchAssignmentApi = {
    async createAssignment(employeeId: string, payload: EmployeeDispatchAssignmentCreatePayload) {
        const res = await axios.post<DispatcherAssignment>(
            url(`/api/employees/${employeeId}/dispatch-assignments`),
            payload
        );
        return res.data;
    },

    async getAssignments() {
        const res = await axios.get<DispatcherAssignment[]>(url(`/api/employees/dispatch-assignments`));
        return res.data;
    },

    async getAssignment(employeeId: string, dispatchAssignmentId: string) {
        const res = await axios.get<DispatcherAssignment>(
            url(`/api/employees/${employeeId}/dispatch-assignments/${dispatchAssignmentId}`)
        );
        return res.data;
    },

    async updateAssignment(employeeId: string, dispatchAssignmentId: string, updated: Partial<EmployeeDispatchAssignmentCreatePayload>) {
        const res = await axios.put(
            url(`/api/employees/${employeeId}/dispatch-assignments/${dispatchAssignmentId}`),
            updated
        );
        return res.data;
    },

    async deleteAssignment(employeeId: string, dispatchAssignmentId: string) {
        const res = await axios.delete(
            url(`/api/employees/${employeeId}/dispatch-assignments/${dispatchAssignmentId}`)
        );
        return res.data;
    },
};
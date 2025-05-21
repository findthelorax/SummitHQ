import axios from 'axios';
import type { Employee, Role, EmployeeRole } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const employeeApi = {
    // Role-related endpoints
    async createRole(role: Omit<Role, 'id' | 'employees' | 'employeeRole'>) {
        const res = await axios.post<Role>(url('/api/employees/roles'), role);
        return res.data;
    },

    async getAllRoles() {
        const res = await axios.get<Role[]>(url('/api/employees/roles'));
        return res.data;
    },

    async getRoleById(roleId: string) {
        const res = await axios.get<Role>(url(`/api/employees/roles/${roleId}`));
        return res.data;
    },

    async updateRole(roleId: string, updated: Partial<Role>) {
        const res = await axios.put<Role>(url(`/api/employees/roles/${roleId}`), updated);
        return res.data;
    },

    async deleteRole(roleId: string) {
        const res = await axios.delete<Role>(url(`/api/employees/roles/${roleId}`));
        return res.data;
    },

    // Employee-related endpoints
    async createEmployee(
        employee: Omit<
            Employee,
            | 'id'
            | 'additionalRoles'
            | 'mountainAssignments'
            | 'dispatcherAssignments'
            | 'incidents'
            | 'aidRoomChecks'
            | 'hutChecks'
            | 'liftChecks'
            | 'trailChecks'
            | 'equipmentChecks'
            | 'equipmentServiceLogs'
        >
    ) {
        const res = await axios.post<Employee>(url('/api/employees'), employee);
        return res.data;
    },

    async getEmployees() {
        const res = await axios.get<Employee[]>(url('/api/employees'));
        return res.data;
    },

    async getEmployeesByMountain(mountainId: string) {
        const res = await axios.get<Employee[]>(url(`/api/mountains/${mountainId}/employees`));
        return res.data;
    },

    async getEmployeeById(employeeId: string) {
        const res = await axios.get<Employee>(url(`/api/employees/${employeeId}`));
        return res.data;
    },

    async updateEmployee(employeeId: string, updated: Partial<Employee>) {
        const res = await axios.put<Employee>(url(`/api/employees/${employeeId}`), updated);
        return res.data;
    },

    async deleteEmployee(employeeId: string) {
        const res = await axios.delete<Employee>(url(`/api/employees/${employeeId}`));
        return res.data;
    },

    // Employee-role relationship endpoints
    async addRoleToEmployee(employeeId: string, role: Omit<EmployeeRole, 'id' | 'employeeId' | 'role'>) {
        const res = await axios.post<EmployeeRole>(url(`/api/employees/${employeeId}/roles`), role);
        return res.data;
    },

    async getEmployeeRoles(employeeId: string) {
        const res = await axios.get<EmployeeRole[]>(url(`/api/employees/${employeeId}/roles`));
        return res.data;
    },

    async updateEmployeeRole(employeeId: string, roleId: string, updated: Partial<EmployeeRole>) {
        const res = await axios.put<EmployeeRole>(url(`/api/employees/${employeeId}/roles/${roleId}`), updated);
        return res.data;
    },

    async removeRoleFromEmployee(employeeId: string, roleId: string) {
        const res = await axios.delete<EmployeeRole>(url(`/api/employees/${employeeId}/roles/${roleId}`));
        return res.data;
    },
};
import axios from 'axios';
import type { Employee, EmployeeRole, Role, EMPLOYEE_STATUS, DEPARTMENT, ROLE_LEVEL } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;
const url = (path: string) => `${BASE_URL}${path}`;

export type EmployeeInputPayload = {
	email: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	roleId: string | null;
	employeeStatus?: EMPLOYEE_STATUS;
};

export type RoleInputPayload = {
	department: DEPARTMENT;
	title: string;
	position: string;
	level?: ROLE_LEVEL;
	permissions: string[];
};

export const employeeApi = {
	async createEmployee(employee: EmployeeInputPayload) {
		const res = await axios.post<Employee>(url(`/api/employees`), employee);
		return res.data;
	},

	async getEmployees() {
		const res = await axios.get<Employee[]>(url(`/api/employees`));
		return res.data;
	},

	async getEmployee(employeeId: string) {
		const res = await axios.get<Employee>(url(`/api/employees/${employeeId}`));
		return res.data;
	},

	async updateEmployee(employeeId: string, updated: Partial<EmployeeInputPayload>) {
		const res = await axios.put<Employee>(url(`/api/employees/${employeeId}`), updated);
		return res.data;
	},

	async deleteEmployee(employeeId: string) {
		const res = await axios.delete(url(`/api/employees/${employeeId}`));
		return res.data;
	},

	async assignToMountain(employeeId: string, mountainId: string) {
		const res = await axios.post(url(`/api/employees/assign-mountain`), { employeeId, mountainId });
		return res.data;
	},

	async getEmployeesByMountain(mountainId: string) {
		const res = await axios.get<Employee[]>(url(`/api/mountains/${mountainId}/employees`));
		return res.data;
	},

	// --- Roles ---
	async createRole(role: Partial<Role>) {
		const res = await axios.post<Role>(url(`/api/employees/roles`), role);
		return res.data;
	},

	async getAllRoles() {
		const res = await axios.get<Role[]>(url(`/api/employees/roles`));
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
		const res = await axios.delete(url(`/api/employees/roles/${roleId}`));
		return res.data;
	},

	async addRoleToEmployee(employeeId: string, roleId: string) {
		const res = await axios.post(url(`/api/employees/${employeeId}/roles`), { roleId });
		return res.data;
	},

	async getEmployeeRoles(employeeId: string) {
		const res = await axios.get<EmployeeRole[]>(url(`/api/employees/${employeeId}/roles`));
		return res.data;
	},

	async updateEmployeeRoles(employeeId: string, roleId: string, newRoleId: string) {
		const res = await axios.put(url(`/api/employees/${employeeId}/roles/${roleId}`), { newRoleId });
		return res.data;
	},

	async removeRoleFromEmployee(employeeId: string, roleId: string) {
		const res = await axios.delete(url(`/api/employees/${employeeId}/roles/${roleId}`));
		return res.data;
	},
};

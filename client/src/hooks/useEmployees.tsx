import { useState, useEffect, useCallback, useMemo } from 'react';
import { employeeApi } from '../api/EmployeeAPI';
import type { EmployeeWithRole, Role } from 'shared/types';
import { DEPARTMENT } from 'shared/types/enums';
import type { EmployeeInputPayload } from '../api/EmployeeAPI';

export function useEmployees(mountainId?: string) {
	const [employees, setEmployees] = useState<EmployeeWithRole[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [roles, setRoles] = useState<Role[]>([]);
	const [selectedDepartment, setSelectedDepartment] = useState<DEPARTMENT | ''>('');

	// Fetch employees, optionally filtered by mountainId
	const fetchEmployees = useCallback(async () => {
		setIsLoading(true);
		try {
			let data: EmployeeWithRole[] = [];
			if (mountainId) {
				data = await employeeApi.getEmployeesByMountain(mountainId);
			} else {
				data = await employeeApi.getEmployees();
			}
			setEmployees(data);
		} finally {
			setIsLoading(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	const fetchRoles = useCallback(async () => {
		const data = await employeeApi.getAllRoles();
		const mappedRoles: Role[] = data.map((item: any) => ({
			id: item.id,
			department: item.department ?? DEPARTMENT.OTHER,
			title: item.title ?? '',
			position: item.position ?? '',
			level: item.level ?? null,
			permissions: item.permissions ?? [],
		}));
		setRoles(mappedRoles);
	}, []);

	useEffect(() => {
		fetchRoles();
	}, [fetchRoles]);

	const createEmployee = useCallback(
		async (employee: EmployeeInputPayload) => {
			await employeeApi.createEmployee(employee);
			await fetchEmployees();
		},
		[fetchEmployees]
	);

	const updateEmployee = useCallback(
		async (employeeId: string, updated: Partial<EmployeeInputPayload>) => {
			const payload: Partial<EmployeeInputPayload> = {
				...(updated.firstName !== undefined ? { firstName: updated.firstName } : {}),
				...(updated.lastName !== undefined ? { lastName: updated.lastName } : {}),
				...(updated.email !== undefined ? { email: updated.email } : {}),
				...(updated.phoneNumber !== undefined ? { phoneNumber: updated.phoneNumber } : {}),
				...(updated.roleId !== undefined ? { roleId: updated.roleId } : {}),
			};
			await employeeApi.updateEmployee(employeeId, payload);
			await fetchEmployees();
		},
		[fetchEmployees]
	);

	const deleteEmployee = useCallback(
		async (employeeId: string) => {
			await employeeApi.deleteEmployee(employeeId);
			await fetchEmployees();
		},
		[fetchEmployees]
	);

	const assignToMountain = useCallback(
		async (employeeId: string, mId: string) => {
			await employeeApi.assignToMountain(employeeId, mId);
			await fetchEmployees();
		},
		[fetchEmployees]
	);

	const getEmployeeRoles = useCallback(async (employeeId: string) => {
		return employeeApi.getEmployeeRoles(employeeId);
	}, []);

	const addRoleToEmployee = useCallback(
		async (employeeId: string, roleId: string) => {
			await employeeApi.addRoleToEmployee(employeeId, roleId);
			await fetchEmployees();
		},
		[fetchEmployees]
	);

	const removeRoleFromEmployee = useCallback(
		async (employeeId: string, roleId: string) => {
			await employeeApi.removeRoleFromEmployee(employeeId, roleId);
			await fetchEmployees();
		},
		[fetchEmployees]
	);

	const departmentOptions = useMemo(
		() => [
			{ label: 'Select Department', value: '' },
			...Object.values(DEPARTMENT).map((dept) => ({
				label: dept
					.replace(/_/g, ' ')
					.toLowerCase()
					.replace(/\b\w/g, (l) => l.toUpperCase()),
				value: dept,
			})),
		],
		[]
	);

	const filteredRoleOptions = useMemo(() => {
		if (!selectedDepartment) return [];
		return roles
			.filter((role) => role.department === selectedDepartment)
			.map((role) => ({
				label: role.title || role.position || role.level,
				value: role.id,
			}));
	}, [roles, selectedDepartment]);

	return {
		employees,
		isLoading,
		fetchEmployees,
		createEmployee,
		updateEmployee,
		deleteEmployee,
		assignToMountain,
		getEmployeeRoles,
		addRoleToEmployee,
		removeRoleFromEmployee,
		roles,
		fetchRoles,
		departmentOptions,
		filteredRoleOptions,
		selectedDepartment,
		setSelectedDepartment,
	};
}

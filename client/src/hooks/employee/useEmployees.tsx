import { useState, useEffect, useCallback, useMemo } from 'react';
import { employeeApi } from '../../api/EmployeeAPI';
import type { EmployeeFull, EmployeeDTO, RoleDTO } from '../../types/index';
import { DEPARTMENT } from '../../types//generated-enums';
import type { EmployeeInputPayload, RoleInputPayload } from '../../api/EmployeeAPI';

export function useEmployees(mountainId?: string) {
	const [employees, setEmployees] = useState<EmployeeFull[]>([]);
	const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
	const [roles, setRoles] = useState<RoleDTO[]>([]);
	const [isLoadingRoles, setIsLoadingRoles] = useState(false);
	const [selectedDepartment, setSelectedDepartment] = useState<DEPARTMENT | ''>('');

	// Fetch employees, optionally filtered by mountainId
	const fetchEmployees = useCallback(async () => {
		setIsLoadingRoles(true);
		try {
			let data: EmployeeFull[] = [];
			if (mountainId) {
				const rawData = await employeeApi.getEmployeesByMountain(mountainId);
				data = rawData.map((emp: any) => ({
					...emp,
					role: emp.role ?? null,
					additionalRoles: emp.additionalRoles ?? [],
					mountainAssignments: emp.mountainAssignments ?? [],
					dispatcherAssignments: emp.dispatcherAssignments ?? [],
					incidents: emp.incidents ?? [],
					employeeDocuments: emp.employeeDocuments ?? [],
					employeeCertifications: emp.employeeCertifications ?? [],
					employeeTrainings: emp.employeeTrainings ?? [],
					equipmentServiceLogs: emp.equipmentServiceLogs ?? [],
				}));
			} else {
				const rawData = await employeeApi.getEmployees();
				data = rawData.map((emp: any) => ({
					...emp,
					role: emp.role ?? null,
					additionalRoles: emp.additionalRoles ?? [],
					mountainAssignments: emp.mountainAssignments ?? [],
					dispatcherAssignments: emp.dispatcherAssignments ?? [],
					incidents: emp.incidents ?? [],
					employeeDocuments: emp.employeeDocuments ?? [],
					employeeCertifications: emp.employeeCertifications ?? [],
					employeeTrainings: emp.employeeTrainings ?? [],
					equipmentServiceLogs: emp.equipmentServiceLogs ?? [],
				}));
			}
			setEmployees(data);
		} finally {
			setIsLoadingRoles(false);
		}
	}, [mountainId]);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	const fetchRoles = useCallback(async () => {
		setIsLoadingRoles(true);
		try {
			const data = await employeeApi.getAllRoles();
			const mappedRoles: RoleDTO[] = data.map((item: any) => ({
				id: item.id,
				department: item.department ?? DEPARTMENT.OTHER,
				title: item.title ?? '',
				position: item.position ?? '',
				level: item.level ?? null,
				permissions: item.permissions ?? [],
				employees: item.employees ?? [],
				employeeRole: item.employeeRole ?? null,
			}));
			setRoles(mappedRoles);
		} finally {
			setIsLoadingRoles(false);
		}
	}, []);

	const createRole = useCallback(
		async (role: RoleInputPayload): Promise<RoleDTO> => {
			const payload: Partial<RoleDTO> = {
				...role,
				permissions: Array.isArray(role.permissions) ? role.permissions.join(',') : role.permissions,
			};
			const created = await employeeApi.createRole(payload);
			await fetchRoles();
			return created;
		},
		[fetchRoles]
	);

	const updateRole = useCallback(
		async (roleId: string, updated: Partial<RoleInputPayload>): Promise<RoleDTO> => {
			const payload: Partial<RoleDTO> = {
				...updated,
				permissions: Array.isArray(updated.permissions)
					? updated.permissions.join(',')
					: updated.permissions,
			};
			const updatedRole = await employeeApi.updateRole(roleId, payload);
			await fetchRoles();
			return updatedRole;
		},
		[fetchRoles]
	);

	const deleteRole = useCallback(
		async (roleId: string) => {
			await employeeApi.deleteRole(roleId);
			await fetchRoles();
		},
		[fetchRoles]
	);

	useEffect(() => {
		fetchRoles();
	}, [fetchRoles]);

	const createEmployee = useCallback(
		async (employee: EmployeeInputPayload): Promise<EmployeeDTO> => {
			const created = await employeeApi.createEmployee(employee);
			await fetchEmployees();
			return created;
		},
		[fetchEmployees]
	);

	const updateEmployee = useCallback(
		async (employeeId: string, updated: Partial<EmployeeInputPayload>): Promise<EmployeeDTO> => {
			const payload: Partial<EmployeeInputPayload> = {
				...(updated.firstName !== undefined ? { firstName: updated.firstName } : {}),
				...(updated.lastName !== undefined ? { lastName: updated.lastName } : {}),
				...(updated.email !== undefined ? { email: updated.email } : {}),
				...(updated.phoneNumber !== undefined ? { phoneNumber: updated.phoneNumber } : {}),
				...(updated.roleId !== undefined ? { roleId: updated.roleId } : {}),
				...(updated.primaryDepartment !== undefined ? { primaryDepartment: updated.primaryDepartment } : {}),
			};
			const updatedEmployee = await employeeApi.updateEmployee(employeeId, payload);
			await fetchEmployees();
			return updatedEmployee;
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

	// TODO USE removeFromMountain function
	const removeEmployeeFromMountain = useCallback(
		async (employeeId: string, mId: string) => {
			await employeeApi.removeEmployeeFromMountain(employeeId, mId);
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
		isLoadingEmployees,
        fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        assignToMountain,
        getEmployeeRoles,
        addRoleToEmployee,
        removeRoleFromEmployee,
        roles,
        isLoadingRoles,
        fetchRoles,
        createRole,
        updateRole,
        deleteRole,
        departmentOptions,
        filteredRoleOptions,
        selectedDepartment,
        setSelectedDepartment,
    };
}

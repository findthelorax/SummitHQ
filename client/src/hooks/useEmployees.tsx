import { useState, useEffect, useCallback } from 'react';
import { employeeApi } from '../api/EmployeeAPI';
import type { Employee, EmployeeRole } from 'shared/types';
import { EMPLOYEE_ROLES, DEPARTMENT } from 'shared/types/enums';

export function useEmployees(mountainId?: string) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState<EmployeeRole[]>([]);

    const fetchEmployees = useCallback(async () => {
        setIsLoading(true);
        try {
            if (mountainId) {
                const data = await employeeApi.getEmployeesByMountain(mountainId);
                setEmployees(data);
            } else {
                const data = await employeeApi.getEmployees();
                setEmployees(data);
            }
        } finally {
            setIsLoading(false);
        }
    }, [mountainId]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const fetchRoles = useCallback(async () => {
        const data = await employeeApi.getAllRoles();
        setRoles(data);
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const createEmployee = useCallback(async (payload: any) => {
        await employeeApi.createEmployee(payload);
        await fetchEmployees();
    }, [fetchEmployees]);

    const updateEmployee = useCallback(async (employeeId: string, updated: Partial<Employee>) => {
        await employeeApi.updateEmployee(employeeId, updated);
        await fetchEmployees();
    }, [fetchEmployees]);

    const deleteEmployee = useCallback(async (employeeId: string) => {
        await employeeApi.deleteEmployee(employeeId);
        await fetchEmployees();
    }, [fetchEmployees]);

    const assignToMountain = useCallback(async (employeeId: string, mId: string) => {
        await employeeApi.assignToMountain(employeeId, mId);
        await fetchEmployees();
    }, [fetchEmployees]);

    // --- Roles ---
    const getEmployeeRoles = useCallback(async (employeeId: string) => {
        return employeeApi.getEmployeeRoles(employeeId);
    }, []);

    const addRoleToEmployee = useCallback(async (employeeId: string, roleId: string) => {
        await employeeApi.addRoleToEmployee(employeeId, roleId);
        await fetchEmployees();
    }, [fetchEmployees]);

    const removeRoleFromEmployee = useCallback(async (employeeId: string, roleId: string) => {
        await employeeApi.removeRoleFromEmployee(employeeId, roleId);
        await fetchEmployees();
    }, [fetchEmployees]);

    // Enum helpers for UI
    const employeeRoleOptions = Object.values(EMPLOYEE_ROLES).map(role => ({
        label: role.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
        value: role,
    }));

    const departmentOptions = Object.values(DEPARTMENT).map(dept => ({
        label: dept.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
        value: dept,
    }));

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
        employeeRoleOptions,
        departmentOptions,
    };
}
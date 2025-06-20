import type { RoleDTO } from '../../types/index';

export function groupRolesByDepartment(roles: RoleDTO[]) {
    return roles.reduce((acc, role) => {
        const dept = role.department || 'Other';
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(role);
        return acc;
    }, {} as Record<string, RoleDTO[]>);
}
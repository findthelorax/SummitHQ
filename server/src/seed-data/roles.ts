import { DEPARTMENT, ROLE_LEVEL } from '../generated/prisma/index.js';

export function getSeedRoles() {
    return [
        // PATROL
        {
            department: DEPARTMENT.PATROL,
            title: 'Patroller',
            position: 'Patroller',
            level: ROLE_LEVEL.LEVEL_1,
            permissions: ['RESPOND_INCIDENT', 'CHECK_AIDROOM'],
        },
        {
            department: DEPARTMENT.PATROL,
            title: 'Senior Patroller',
            position: 'Senior Patroller',
            level: ROLE_LEVEL.LEVEL_2,
            permissions: ['RESPOND_INCIDENT', 'CHECK_AIDROOM', 'LEAD_TEAM'],
        },
        {
            department: DEPARTMENT.PATROL,
            title: 'Patrol Supervisor',
            position: 'Supervisor',
            level: ROLE_LEVEL.LEVEL_3,
            permissions: ['RESPOND_INCIDENT', 'CHECK_AIDROOM', 'LEAD_TEAM', 'APPROVE_REPORTS'],
        },
        // DISPATCH
        {
            department: DEPARTMENT.DISPATCH,
            title: 'Dispatcher',
            position: 'Dispatcher',
            level: ROLE_LEVEL.LEVEL_2,
            permissions: ['DISPATCH_CALLS', 'ASSIGN_INCIDENT'],
        },
        {
            department: DEPARTMENT.DISPATCH,
            title: 'Lead Dispatcher',
            position: 'Lead Dispatcher',
            level: ROLE_LEVEL.LEVEL_3,
            permissions: ['DISPATCH_CALLS', 'ASSIGN_INCIDENT', 'MANAGE_SCHEDULE'],
        },
        {
            department: DEPARTMENT.DISPATCH,
            title: 'Dispatch Supervisor',
            position: 'Supervisor',
            level: ROLE_LEVEL.LEVEL_4,
            permissions: ['DISPATCH_CALLS', 'ASSIGN_INCIDENT', 'MANAGE_SCHEDULE', 'APPROVE_LOGS'],
        },
        // LIFT_OPERATIONS
        {
            department: DEPARTMENT.LIFT_OPERATIONS,
            title: 'Lift Operator',
            position: 'Operator',
            level: ROLE_LEVEL.LEVEL_1,
            permissions: ['OPERATE_LIFT'],
        },
        {
            department: DEPARTMENT.LIFT_OPERATIONS,
            title: 'Lift Lead',
            position: 'Lead Operator',
            level: ROLE_LEVEL.LEVEL_2,
            permissions: ['OPERATE_LIFT', 'TRAIN_OPERATORS'],
        },
        {
            department: DEPARTMENT.LIFT_OPERATIONS,
            title: 'Lift Supervisor',
            position: 'Supervisor',
            level: ROLE_LEVEL.LEVEL_3,
            permissions: ['OPERATE_LIFT', 'TRAIN_OPERATORS', 'SCHEDULE_OPERATORS'],
        },
        // MAINTENANCE
        {
            department: DEPARTMENT.MAINTENANCE,
            title: 'Mechanic',
            position: 'Mechanic',
            level: ROLE_LEVEL.LEVEL_3,
            permissions: ['SERVICE_EQUIPMENT', 'INSPECT_LIFT'],
        },
        {
            department: DEPARTMENT.MAINTENANCE,
            title: 'Senior Mechanic',
            position: 'Senior Mechanic',
            level: ROLE_LEVEL.LEVEL_4,
            permissions: ['SERVICE_EQUIPMENT', 'INSPECT_LIFT', 'ORDER_PARTS'],
        },
        {
            department: DEPARTMENT.MAINTENANCE,
            title: 'Maintenance Supervisor',
            position: 'Supervisor',
            level: ROLE_LEVEL.LEVEL_5,
            permissions: ['SERVICE_EQUIPMENT', 'INSPECT_LIFT', 'ORDER_PARTS', 'APPROVE_WORK'],
        },
        // ADMINISTRATION
        {
            department: DEPARTMENT.ADMINISTRATION,
            title: 'Manager',
            position: 'Manager',
            level: ROLE_LEVEL.LEVEL_5,
            permissions: ['MANAGE_EMPLOYEES', 'VIEW_REPORTS'],
        },
        {
            department: DEPARTMENT.ADMINISTRATION,
            title: 'HR Specialist',
            position: 'HR Specialist',
            level: ROLE_LEVEL.LEVEL_4,
            permissions: ['MANAGE_EMPLOYEES', 'HANDLE_PAYROLL'],
        },
        {
            department: DEPARTMENT.ADMINISTRATION,
            title: 'Director',
            position: 'Director',
            level: ROLE_LEVEL.LEVEL_6,
            permissions: ['MANAGE_EMPLOYEES', 'VIEW_REPORTS', 'SET_POLICY'],
        },
    ];
}
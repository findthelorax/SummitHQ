import {
    STATUS, LIFT_TYPE, TRAIL_DIFFICULTY, TRAIL_CONDITION, EQUIPMENT_STATUS,
    AREA_TYPE, LOCATION_TYPE, DEPARTMENT, ROLE_LEVEL, INCIDENT_STATUS,
    EMPLOYEE_STATUS
} from '../../types/generated-enums';
import { EmployeeRow } from '../AgGrid/tableTypes';

// export const getEmptyNewEmployeeRow = () => ({
//     id: '',
//     employeeIdNumber: 0,
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     status: EMPLOYEE_STATUS.INACTIVE,
//     primaryDepartment: DEPARTMENT.OTHER,
//     roleId: '',
//     startDate: '',
//     endDate: '',
//     isNew: true,
// });

export function getEmptyNewEmployeeRow(): EmployeeRow {
    return {
        id: '',
        employeeIdNumber: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        status: EMPLOYEE_STATUS.ACTIVE,
        primaryDepartment: DEPARTMENT.OTHER,
        roleId: '',
        startDate: '',
        endDate: '',
        isNew: true,
        // Add all missing EmployeeRow properties with default values
        mountainId: '',
        roleDepartment: DEPARTMENT.OTHER,
        roleTitle: '',
        rolePosition: '',
        roleLevel: ROLE_LEVEL.LEVEL_1,
        rolePermissions: '',
        certifications: '',
        assignedMountainName: '',
        assignedMountainCity: '',
        assignedMountainState: '',
    };
}

export const getEmptyNewRoleRow = () => ({
    id: '',
    department: DEPARTMENT.OTHER,
    title: '',
    position: '',
    level: ROLE_LEVEL.LEVEL_1,
    permissions: [],
    isNew: true,
});

export const getEmptyNewEquipmentRow = () => ({
    id: '',
    name: '',
    status: EQUIPMENT_STATUS.OPERATIONAL,
    type: '',
    number: 0,
    description: '',
    picture: '',
    cost: 0,
    latitude: null,
    longitude: null,
    mountainId: '',
    locationId: '',
    areaId: '',
    isNew: true,
});

export const getEmptyNewEquipmentCheckRow = () => ({
    id: '',
    recordedAt: '',
    employeeId: '',
    mountainId: '',
    equipmentId: '',
    notes: '',
    isNew: true,
});

export const getEmptyNewIncidentRow = () => ({
    id: '',
    description: '',
    status: INCIDENT_STATUS.REPORTED,
    latitude: '',
    longitude: '',
    mountainId: '',
    locationId: '',
    startTime: '',
    endTime: '',
    callTime: '',
    onSceneTime: '',
    stableTime: '',
    transportTime: '',
    emptyRun: false,
    emptyRunAt: '',
    employees: [],
    isNew: true,
});

export const getEmptyNewMountainRow = () => ({
    id: '',
    name: '',
    latitude: null,
    longitude: null,
    height: 0,
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    openingDate: '',
    closingDate: '',
    isNew: true,
});

export const getEmptyNewWeatherRow = () => ({
    id: '',
    mountainId: '',
    date: '',
    temperature: 0,
    windSpeed: 0,
    windDirection: '',
    visibility: 0,
    conditions: '',
    snowfallRecent: 0,
    snowfall24h: 0,
    snowfall7d: 0,
    isNew: true,
});

export const getEmptyNewHoursRow = () => ({
    id: '',
    locationId: '',
    dayOfWeek: 1,
    date: '',
    openTime: '',
    closeTime: '',
    status: STATUS.CLOSED,
    isNew: true,
});

export const getEmptyNewAreaRow = () => ({
    id: '',
    mountainId: '',
    name: '',
    type: AREA_TYPE.OTHER,
    description: '',
    isNew: true,
});

export const getEmptyNewAidRoomRow = () => ({
    id: '',
    name: '',
    status: STATUS.CLOSED,
    latitude: null,
    longitude: null,
    areaId: '',
    isNew: true,
});

export const getEmptyNewHutRow = () => ({
    id: '',
    name: '',
    status: STATUS.CLOSED,
    latitude: null,
    longitude: null,
    areaId: '',
    isNew: true,
});

export const getEmptyNewLiftRow = () => ({
    id: '',
    name: '',
    status: STATUS.CLOSED,
    type: LIFT_TYPE.GONDOLA,
    capacity: 0,
    latitude: null,
    longitude: null,
    areaId: '',
    isNew: true,
});

export const getEmptyNewLodgeRow = () => ({
    id: '',
    name: '',
    status: STATUS.CLOSED,
    capacity: 0,
    latitude: null,
    longitude: null,
    areaId: '',
    isNew: true,
});

export const getEmptyNewTrailRow = () => ({
    id: '',
    name: '',
    difficulty: TRAIL_DIFFICULTY.GREEN_CIRCLE,
    status: STATUS.CLOSED,
    condition: TRAIL_CONDITION.CLOSED,
    areaId: '',
    length: 0,
    latitude: null,
    longitude: null,
    isNew: true,
});

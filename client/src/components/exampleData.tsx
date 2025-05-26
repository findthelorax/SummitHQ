import type { EmployeeInputPayload } from '../api/EmployeeAPI';
import type { RoleInputPayload } from '../api/EmployeeAPI';
import type { EquipmentInputPayload } from '../api/EquipmentAPI';
import type { MountainInputPayload } from '../api/MountainAPI';
import type { AreaInputPayload } from '../api/AreaAPI';
import type { TrailInputPayload } from '../api/TrailAPI';
import type { LiftInputPayload } from '../api/LiftAPI';
import type { HutInputPayload } from '../api/HutAPI';
import type { AidRoomInputPayload } from '../api/AidRoomAPI';
import type { LodgeInputPayload } from '../api/LodgeAPI';
import type { IncidentInputPayload } from '../api/IncidentsAPI';
import {
	LIFT_TYPE,
	STATUS,
	TRAIL_CONDITION,
	TRAIL_DIFFICULTY,
	DEPARTMENT,
	AREA_TYPE,
	EMPLOYEE_STATUS,
	ROLE_LEVEL,
	EQUIPMENT_STATUS,
	INCIDENT_STATUS,
} from 'shared/types/enums';

export const exampleMountain: MountainInputPayload = {
	name: 'Mount Example',
	city: 'Sampleville',
	state: 'CO',
	latitude: 39.7392,
	longitude: -104.9903,
	height: 14200,
	phoneNumber: '303-555-1234',
	address: '123 Example Rd',
	zipcode: '80000',
	openingDate: '2025-11-01',
	closingDate: '2026-04-15',
};

export const exampleArea: AreaInputPayload = {
	name: 'Base Area',
	type: AREA_TYPE.BASE_AREA,
	description: 'Main base area with ticketing and rentals',
};

export const exampleLift: LiftInputPayload = {
	name: 'Summit Express',
	type: LIFT_TYPE.CHAIR,
	status: STATUS.OPEN,
	capacity: 4,
	latitude: 39.74,
	longitude: -104.99,
	locationId: 'location-lift-1',
};

export const exampleTrail: TrailInputPayload = {
	name: 'Powder Run',
	difficulty: TRAIL_DIFFICULTY.BLUE_SQUARE,
	status: STATUS.OPEN,
	length: 2.5,
	latitude: 39.741,
	longitude: -104.991,
	condition: TRAIL_CONDITION.PACKED_POWDER,
};

export const exampleLodge: LodgeInputPayload = {
	name: 'Summit Lodge',
	capacity: 200,
	latitude: 39.742,
	longitude: -104.992,
	status: STATUS.OPEN,
};

export const exampleHut: HutInputPayload = {
	name: 'Patrol Hut',
	status: STATUS.OPEN,
	latitude: 39.743,
	longitude: -104.993,
};

export const exampleAidRoom: AidRoomInputPayload = {
	name: 'First Aid Room',
	status: STATUS.OPEN,
	latitude: 39.744,
	longitude: -104.994,
};

export const exampleEquipment: EquipmentInputPayload = {
	name: 'Rescue Toboggan',
	type: 'Toboggan',
	number: 101,
	status: EQUIPMENT_STATUS.OPERATIONAL,
	description: 'Standard rescue toboggan',
	picture: 'https://example.com/toboggan.jpg',
	cost: 1200,
	latitude: 39.745,
	longitude: -104.995,
};

export const exampleRole: RoleInputPayload = {
	department: DEPARTMENT.PATROL,
	title: 'Ski Patroller',
	position: 'Advanced',
	level: ROLE_LEVEL.LEVEL_2,
	permissions: ['RESPOND_INCIDENT', 'ASSIST_GUESTS'],
};

export const exampleEmployee: EmployeeInputPayload = {
	email: 'patroller1@example.com',
	phoneNumber: '303-555-5678',
	firstName: 'Jane',
    lastName: 'Doe',
	employeeStatus: EMPLOYEE_STATUS.ACTIVE,
	roleId: 'role-1',
};

export const exampleIncident: IncidentInputPayload = {
	title: 'Ski Accident',
	description: 'Guest fell on Powder Run',
	status: INCIDENT_STATUS.REPORTED,
	callTime: '2025-12-15T09:30:00Z',
	onSceneTime: '2025-12-15T09:35:00Z',
	stableTime: '2025-12-15T09:45:00Z',
	transportTime: '2025-12-15T10:00:00Z',
	dryRun: false,
	incidentEquipmentUsageLog: [],
};

export const exampleDataMap: Record<string, any> = {
    '/mountains': exampleMountain,
    '/areas': exampleArea,
    '/lifts': exampleLift,
    '/trails': exampleTrail,
    '/lodges': exampleLodge,
    '/huts': exampleHut,
    '/aidRooms': exampleAidRoom,
    '/equipment': exampleEquipment,
    '/roles': exampleRole,
    '/employees': exampleEmployee,
    '/incidents': exampleIncident,
};
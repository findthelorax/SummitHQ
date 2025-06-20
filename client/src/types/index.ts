import {
	AREA_TYPE,
	DEPARTMENT,
	EMPLOYEE_STATUS,
	ROLE_LEVEL,
	EQUIPMENT_STATUS,
	INCIDENT_STATUS,
	LIFT_TYPE,
	LOCATION_TYPE,
	STATUS,
	TRAIL_CONDITION,
	TRAIL_DIFFICULTY,
} from './generated-enums';

export type With<T, K extends string, V> = T & { [P in K]?: V };

// --- DTOs for API/frontend ---

export interface EmployeeDTO {
	id: string;
	employeeIdNumber?: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	status: EMPLOYEE_STATUS;
	primaryDepartment?: DEPARTMENT;
	roleId?: string | null;
	role?: RoleDTO | null;
	roleDepartment?: string;
	roleTitle?: string;
	rolePosition?: string;
	roleLevel?: ROLE_LEVEL;
	mountainId?: string;
	startDate?: string;
	endDate?: string | null;
	mountainAssignments: EmployeeMountainAssignmentDTO[];
	certifications: CertificationDTO[];
	additionalRoles: EmployeeRoleDTO[];
}

export interface RoleDTO {
	id: string;
	department: DEPARTMENT;
	title: string;
	position: string;
	level: ROLE_LEVEL;
	permissions: string[];
}

export interface EmployeeRoleDTO {
	id: string;
	employeeId: string;
	roleId: string;
}

export interface CertificationDTO {
	id: string;
	name: string;
	issuedBy?: string;
	issuedAt?: string;
	expiresAt?: string;
	employeeId: string;
}

export interface EmployeeMountainAssignmentDTO {
	id: string;
	employeeId: string;
	mountainId: string;
	assignedAt: string;
	mountain: MountainDTO;
}

export interface DispatcherAssignmentDTO {
	id: string;
	employeeId: string;
	mountainId: string;
	assignedAt: string;
}

export interface EquipmentDTO {
	id: string;
	name: string;
	type: string;
	status: EQUIPMENT_STATUS;
	number?: number;
	description?: string;
	picture?: string;
	cost?: number;
	latitude?: number;
	longitude?: number;
	mountainId?: string;
	locationId?: string | null;
	dateAdded: string;
}

export interface EquipmentCheckDTO {
	id: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	equipmentId: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface EquipmentServiceLogDTO {
	id: string;
	mountainId: string;
	equipmentId: string;
	employeeId?: string;
	status: EQUIPMENT_STATUS;
	changedAt: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface MountainDTO {
	id: string;
	name: string;
	latitude?: number | null;
	longitude?: number | null;
	height: number | null;
	phoneNumber?: string | null;
	address: string | null;
	city: string | null;
	state: string | null;
	zipcode: string | null;
	openingDate: string | null;
	closingDate: string | null;
	weather?: WeatherDTO[];
	locations?: LocationDTO[];
	areas?: AreaDTO[];
	aidRooms?: AidRoomDTO[];
	huts?: HutDTO[];
	lifts?: LiftDTO[];
	lodges?: LodgeDTO[];
	trails?: TrailDTO[];
	aidRoomChecks?: AidRoomCheckDTO[];
	hutChecks?: HutCheckDTO[];
	liftChecks?: LiftCheckDTO[];
	trailChecks?: TrailCheckDTO[];
	equipmentChecks?: EquipmentCheckDTO[];
	incidents?: IncidentDTO[];
	equipment?: EquipmentDTO[];
	employeeAssignments?: EmployeeMountainAssignmentDTO[];
	dispatcherAssignments?: DispatcherAssignmentDTO[];
	incidentEquipmentUsageLog?: IncidentEquipmentUsageLogDTO[];
	equipmentServiceLogs?: EquipmentServiceLogDTO[];
}

export interface WeatherDTO {
	id: string;
	mountainId: string;
	date: string;
	temperature: number;
	windSpeed?: number;
	windDirection?: string;
	visibility?: number;
	conditions?: string;
	snowfallRecent?: number;
	snowfall24h?: number;
	snowfall7d?: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface HoursDTO {
	id: string;
	locationId: string;
	dayOfWeek?: number;
	date?: string;
	openTime?: string;
	closeTime?: string;
	status: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface AreaDTO {
	id: string;
	mountainId: string;
	name: string;
	type: AREA_TYPE;
	description?: string;
	locations: LocationDTO[];
}

export interface LocationDTO {
	id: string;
	mountainId: string;
	name: string;
	entityId: string;
	entityType: LOCATION_TYPE;
	area: AreaDTO | null;
	areaId?: string | null;

	latitude?: number | null;
	longitude?: number | null;

	hours?: HoursDTO[];
	equipment?: EquipmentDTO[];
	incidents?: IncidentDTO[];

	aidRoom?: AidRoomDTO | null;
	hut?: HutDTO | null;
	lift?: LiftDTO | null;
	lodge?: LodgeDTO | null;
	trail?: TrailDTO | null;
}

export interface AidRoomDTO {
	id: string;
	name: string;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
}

export interface AidRoomCheckDTO {
	id: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	aidRoomId: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface HutDTO {
	id: string;
	name: string;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
}

export interface HutCheckDTO {
	id: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	hutId: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface LiftDTO {
	id: string;
	name: string;
	type: LIFT_TYPE;
	status: STATUS;
	capacity: number | 0;
	latitude: number | null;
	longitude: number | null;
}

export interface LiftCheckDTO {
	id: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	liftId: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface LodgeDTO {
	id: string;
	name: string;
	capacity: number | 0;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
}

export interface TrailDTO {
	id: string;
	name: string;
	difficulty: TRAIL_DIFFICULTY;
	condition: TRAIL_CONDITION;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
	length?: number;
}

export interface TrailCheckDTO {
	id: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	trailId: string;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IncidentDTO {
	id: string;
	description: string;
	status: INCIDENT_STATUS;
	latitude?: number | null;
	longitude?: number | null;
	mountainId: string;
	locationId: string;
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
	startTime: string;
	endTime?: string;
	onSceneTime?: string;
	stableTime?: string;
	transportTime?: string;
	emptyRun?: boolean;
	emptyRunAt?: string;
	employees?: EmployeeDTO[];
	incidentEquipmentUsageLog?: IncidentEquipmentUsageLogDTO[];
}

export interface IncidentEquipmentUsageLogDTO {
	id: string;
	usedAt: string;
	notes?: string;
	mountainId: string;
	equipmentId: string;
	incidentId: string;
	createdAt?: string;
	updatedAt?: string;
}

// --- "Full" and "WithLocation" types using DTOs ---

export type EquipmentWithLocation = EquipmentDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
};

export type EquipmentFull = EquipmentDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
	incidentEquipmentUsageLogs: IncidentEquipmentUsageLogDTO[];
	equipmentChecks: EquipmentCheckDTO[];
	equipmentServiceLogs: EquipmentServiceLogDTO[];
};

export type EmployeeFull = EmployeeDTO & {
	dispatcherAssignments: DispatcherAssignmentDTO[];
	incidents: IncidentDTO[];
	aidRoomChecks: AidRoomCheckDTO[];
	hutChecks: HutCheckDTO[];
	liftChecks: LiftCheckDTO[];
	trailChecks: TrailCheckDTO[];
	equipmentChecks: EquipmentCheckDTO[];
	equipmentServiceLogs: EquipmentServiceLogDTO[];
};

export type MountainFull = MountainDTO & {
	id: string;
	name: string;
	weather: WeatherDTO[];
	locations: LocationDTO[];
	areas: AreaDTO[];
	aidRooms: AidRoomDTO[];
	huts: HutDTO[];
	lifts: LiftDTO[];
	lodges: LodgeDTO[];
	trails: TrailDTO[];
	aidRoomChecks: AidRoomCheckDTO[];
	hutChecks: HutCheckDTO[];
	liftChecks: LiftCheckDTO[];
	trailChecks: TrailCheckDTO[];
	equipmentChecks: EquipmentCheckDTO[];
	incidents: IncidentDTO[];
	equipment: EquipmentDTO[];
	employeeAssignments: EmployeeMountainAssignmentDTO[];
	dispatcherAssignments: DispatcherAssignmentDTO[];
	incidentEquipmentUsageLog: IncidentEquipmentUsageLogDTO[];
	equipmentServiceLogs: EquipmentServiceLogDTO[];
};

export type AreaFull = AreaDTO & {
	locations: LocationDTO[];
	aidrooms: AidRoomDTO[];
	huts: HutDTO[];
	lifts: LiftDTO[];
	lodges: LodgeDTO[];
	trails: TrailDTO[];
};

export type LocationFull = LocationDTO & {
	mountain: MountainFull;
	area?: AreaDTO | null;
	aidRoom?: AidRoomDTO | null;
	hut?: HutDTO | null;
	lift?: LiftDTO | null;
	lodge?: LodgeDTO | null;
	trail?: TrailDTO | null;
	hours: HoursDTO[];
	equipment: EquipmentDTO[];
	incidents: IncidentDTO[];
};

export type AidRoomFull = AidRoomDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
	aidRoomChecks: AidRoomCheckDTO[];
};

export type AidRoomWithLocation = AidRoomDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
};

export type HutFull = HutDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
	hutChecks: HutCheckDTO[];
};

export type HutWithLocation = HutDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
};

export type LiftFull = LiftDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
	liftChecks: LiftCheckDTO[];
};

export type LiftWithLocation = LiftDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
};

export type LodgeWithLocation = LodgeDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
};

export type LodgeFull = LodgeDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
	lodgeChecks: TrailCheckDTO[];
};

export type TrailFull = TrailDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
	trailChecks: TrailCheckDTO[];
};

export type TrailWithLocation = TrailDTO & {
	location?: (LocationDTO & { area?: AreaDTO | null }) | null;
};
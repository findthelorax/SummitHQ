import type {
	Area,
	Trail,
	Lift,
	Hut,
	AidRoom,
	Lodge,
	Equipment,
	Location,
	EmployeeMountainAssignment,
	Employee as PrismaEmployee,
	Role as PrismaRole,
	EmployeeRole,
	DispatcherAssignment,
	Incident,
	AidRoomCheck,
	HutCheck,
	LiftCheck,
	TrailCheck,
	EquipmentCheck,
	EquipmentServiceLog,
	Mountain as PrismaMountain,
	Weather,
	IncidentEquipmentUsageLog,
	Hours,
} from '../../server/src/generated/prisma';

export * from '../../server/src/generated/prisma';

export {
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
} from '../types/enums';

// Equipment with optional location (only includes necessary Location fields)
export type EquipmentWithLocation = Equipment & {
	location?: {
		entityType: string;
	} | null;
};

// Employee with all relations
export type EmployeeFull = PrismaEmployee & {
	role?: PrismaRole | null;
	additionalRoles: EmployeeRole[];
	mountainAssignments: EmployeeMountainAssignment[];
	dispatcherAssignments: DispatcherAssignment[];
	incidents: Incident[];
	aidRoomChecks: AidRoomCheck[];
	hutChecks: HutCheck[];
	liftChecks: LiftCheck[];
	trailChecks: TrailCheck[];
	equipmentChecks: EquipmentCheck[];
	equipmentServiceLogs: EquipmentServiceLog[];
};

// Employee with role (for department filtering)
export type EmployeeWithRole = PrismaEmployee & {
	role?: PrismaRole | null;
	mountainAssignments: EmployeeMountainAssignment[];
};

// Area with all related entities eagerly loaded
export type AreaWithEntities = Area & {
	trails: Trail[];
	lifts: Lift[];
	huts: Hut[];
	aidrooms: AidRoom[];
	lodges: Lodge[];
	locations: Location[];
};

// Mountain with all related entities eagerly loaded
export type MountainFull = PrismaMountain & {
	weather: Weather[];
	locations: Location[];
	areas: Area[];
	aidRooms: AidRoom[];
	huts: Hut[];
	lodges: Lodge[];
	lifts: Lift[];
	trails: Trail[];
	aidRoomChecks: AidRoomCheck[];
	hutChecks: HutCheck[];
	liftChecks: LiftCheck[];
	trailChecks: TrailCheck[];
	equipmentChecks: EquipmentCheck[];
	incidents: Incident[];
	equipment: Equipment[];
	employeeAssignments: EmployeeMountainAssignment[];
	dispatcherAssignments: DispatcherAssignment[];
	incidentEquipmentUsageLog: IncidentEquipmentUsageLog[];
	equipmentServiceLogs: EquipmentServiceLog[];
};

// Location with all possible relations
export type LocationFull = Location & {
	area?: Area | null;
	mountain: PrismaMountain;
	lift?: Lift | null;
	trail?: Trail | null;
	hut?: Hut | null;
	lodge?: Lodge | null;
	aidRoom?: AidRoom | null;
	hours: Hours[];
	equipment: Equipment[];
	incidents: Incident[];
};

// Equipment with all checks and logs
export type EquipmentFull = Equipment & {
	location?: Location | null;
	incidentEquipmentUsageLogs: IncidentEquipmentUsageLog[];
	equipmentChecks: EquipmentCheck[];
	equipmentServiceLogs: EquipmentServiceLog[];
};

// Incident with all relations
export type IncidentFull = Incident & {
	mountain: PrismaMountain;
	location: Location;
	employees: PrismaEmployee[];
	incidentEquipmentUsageLog: IncidentEquipmentUsageLog[];
};
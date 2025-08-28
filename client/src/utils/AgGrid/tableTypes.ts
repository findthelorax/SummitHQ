import type {
	STATUS,
	LIFT_TYPE,
	TRAIL_CONDITION,
	TRAIL_DIFFICULTY,
	EQUIPMENT_STATUS,
	DEPARTMENT,
	ROLE_LEVEL,
	AREA_TYPE,
	LOCATION_TYPE,
	INCIDENT_STATUS,
	EMPLOYEE_STATUS,
} from '../../types/generated-enums';
import type {
	MountainDTO,
	WeatherDTO,
	HoursDTO,
	AreaDTO,
	IncidentDTO,
	IncidentEquipmentUsageLogDTO,
	EquipmentServiceLogDTO,
	EquipmentCheckDTO,
	EmployeeDTO,
	RoleDTO,
	EquipmentWithLocation,
	AidRoomWithLocation,
	AidRoomCheckDTO,
	HutWithLocation,
	HutCheckDTO,
	LodgeWithLocation,
	LiftWithLocation,
	LiftCheckDTO,
	TrailWithLocation,
	TrailCheckDTO,
} from '../../types/index';
import type { EquipmentInputPayload } from '../../api/EquipmentAPI';
import type { EmployeeInputPayload } from '../../api/EmployeeAPI';
import type { RoleInputPayload } from '../../api/EmployeeAPI';
import type { MountainInputPayload } from '../../api/MountainAPI';
import type { AidRoomInputPayload } from '../../api/AidRoomAPI';
import type { HutInputPayload } from '../../api/HutAPI';
import type { LiftInputPayload } from '../../api/LiftAPI';
import type { LodgeInputPayload } from '../../api/LodgeAPI';
import type { TrailInputPayload } from '../../api/TrailAPI';
import type { IncidentInputPayload } from '../../api/IncidentAPI';

/** Generic handler types for add/update actions */
export type AddEntityHandler<TInput, TResult> = (input: TInput) => Promise<TResult>;
export type UpdateEntityHandler<TInput, TResult> = (id: string, update: Partial<TInput>) => Promise<TResult>;

/** Equipment */
export type EquipmentRow = {
	id?: string;
	name: string;
	type: string;
	number?: number | null;
	description?: string | null;
	status: EQUIPMENT_STATUS;
	picture?: string | null;
	cost?: number | null;
	latitude?: number | null;
	longitude?: number | null;
	mountainId?: string | null;
	locationId?: string | null;
	dateAdded?: string | Date;
	areaId?: string | null;
	isNew?: boolean;
};

export interface BaseEquipmentTableAgGridProps {
	equipment: EquipmentWithLocation[];
	fetchEquipment: () => Promise<void>;
	isLoadingEquipment: boolean;
	mountains?: MountainDTO[];
	mountainId: string;
	mountainName: string;
}

export interface EquipmentTableAgGridProps extends BaseEquipmentTableAgGridProps {
	fetchAllEquipment: () => Promise<void>;
	updateEquipment: UpdateEntityHandler<EquipmentInputPayload, EquipmentWithLocation>;
	deleteEquipment: (equipmentId: string) => Promise<void>;
	onEditEquipment?: (equipment: EquipmentWithLocation) => void;
	onAddEquipment?: AddEntityHandler<EquipmentInputPayload, EquipmentWithLocation>;
}

/** Equipment Checks */
export type EquipmentCheckRow = {
	id?: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	equipmentId: string;
	notes?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface EquipmentChecksTableAgGridProps {
	equipmentChecks: EquipmentCheckDTO[];
	fetchEquipmentChecks: () => Promise<void>;
	isLoading: boolean;
	updateEquipmentCheck: UpdateEntityHandler<EquipmentCheckDTO, EquipmentCheckDTO>;
	deleteEquipmentCheck: (checkId: string) => Promise<void>;
	onEditEquipmentCheck?: (check: EquipmentCheckDTO) => void;
	onAddEquipmentCheck?: AddEntityHandler<EquipmentCheckDTO, EquipmentCheckDTO>;
	mountainId: string;
	mountainName: string;
}

/** Equipment Service Logs */
export type EquipmentServiceLogRow = {
	id?: string;
	mountainId: string;
	equipmentId: string;
	employeeId?: string | null;
	status: EQUIPMENT_STATUS;
	changedAt: string;
	notes?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface EquipmentServiceLogsTableAgGridProps {
	equipmentServiceLogs: EquipmentServiceLogDTO[];
	fetchEquipmentServiceLogs: () => Promise<void>;
	isLoading: boolean;
	updateEquipmentServiceLog: UpdateEntityHandler<EquipmentServiceLogDTO, EquipmentServiceLogDTO>;
	deleteEquipmentServiceLog: (logId: string) => Promise<void>;
	onEditEquipmentServiceLog?: (log: EquipmentServiceLogDTO) => void;
	onAddEquipmentServiceLog?: AddEntityHandler<EquipmentServiceLogDTO, EquipmentServiceLogDTO>;
	mountainId: string;
	mountainName: string;
}

/** Employees */
export type EmployeeRow = {
	id: string;
	employeeIdNumber: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	status: EMPLOYEE_STATUS;
	primaryDepartment: DEPARTMENT;
	roleId: string;
	startDate: string;
	endDate: string;
	mountainId: string;
	isNew?: boolean;

	// All fields below are required and non-optional!
	roleDepartment: DEPARTMENT;
	roleTitle: string;
	rolePosition: string;
	roleLevel: ROLE_LEVEL;
	rolePermissions: string;
	certifications: string;
	assignedMountainName: string;
	assignedMountainCity: string;
	assignedMountainState: string;
};

export interface BaseEmployeesTableAgGridProps {
	employees: EmployeeDTO[];
	fetchEmployees: () => Promise<void>;
	isLoading: boolean;
	roles: RoleDTO[];
	mountains?: MountainDTO[];
	mountainId?: string;
	mountainName?: string;
}

export interface EmployeesTableAgGridProps extends BaseEmployeesTableAgGridProps {
	updateEmployee: UpdateEntityHandler<EmployeeInputPayload, EmployeeDTO>;
	deleteEmployee: (employeeId: string) => Promise<void>;
	onEditEmployee?: (employee: EmployeeDTO) => void;
	onAddEmployee?: AddEntityHandler<EmployeeInputPayload, EmployeeDTO>;
}

/** Roles */
export type RoleRow = {
	id?: string;
	department: DEPARTMENT;
	title: string;
	position: string;
	level: ROLE_LEVEL;
	permissions: string[];
	isNew?: boolean;
};

export interface BaseRolesTableAgGridProps {
	roles: RoleDTO[];
	fetchRoles: () => Promise<void>;
	isLoading: boolean;
	mountainId: string;
	mountainName: string;
}
export interface RolesTableAgGridProps extends BaseRolesTableAgGridProps {
	updateRole: UpdateEntityHandler<RoleInputPayload, RoleDTO>;
	deleteRole: (roleId: string) => Promise<void>;
	onAddRole: AddEntityHandler<RoleInputPayload, RoleDTO>;
	onEditRole: (role: RoleDTO) => void;
}

/** Incidents */
export type IncidentRow = {
	id?: string;
	description: string;
	status: INCIDENT_STATUS;
	latitude?: number | null;
	longitude?: number | null;
	mountainId: string;
	locationId: string;
	startTime: string;
	endTime?: string | null;
	employees?: EmployeeDTO[] | null;
	callTime?: string | null;
	onSceneTime?: string | null;
	stableTime?: string | null;
	transportTime?: string | null;
	emptyRun?: boolean | null;
	emptyRunAt?: string | null;
	isNew?: boolean;
};

export interface BaseIncidentsTableAgGridProps {
	incidents: IncidentDTO[];
	fetchIncidents: () => Promise<void>;
	updateIncident: UpdateEntityHandler<IncidentInputPayload, IncidentDTO>;
	isLoading: boolean;
	mountains?: MountainDTO[];
	mountainId: string;
	mountainName: string;
}

export interface IncidentsTableAgGridProps extends BaseIncidentsTableAgGridProps {
	deleteIncident: (incidentId: string) => Promise<void>;
	onEditIncident?: (incident: IncidentDTO) => void;
	onAddIncident?: AddEntityHandler<IncidentInputPayload, IncidentDTO>;
}

/** Incident Equipment Usage Logs */
export type IncidentEquipmentUsageLogRow = {
	id?: string;
	usedAt: string;
	notes?: string | null;
	mountainId: string;
	equipmentId: string;
	incidentId: string;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface IncidentEquipmentUsageLogsTableAgGridProps {
	incidentEquipmentUsageLogs: IncidentEquipmentUsageLogDTO[];
	fetchIncidentEquipmentUsageLogs: () => Promise<void>;
	isLoading: boolean;
	updateIncidentEquipmentUsageLog: UpdateEntityHandler<IncidentEquipmentUsageLogDTO, IncidentEquipmentUsageLogDTO>;
	deleteIncidentEquipmentUsageLog: (logId: string) => Promise<void>;
	onEditIncidentEquipmentUsageLog?: (log: IncidentEquipmentUsageLogDTO) => void;
	onAddIncidentEquipmentUsageLog?: AddEntityHandler<IncidentEquipmentUsageLogDTO, IncidentEquipmentUsageLogDTO>;
	mountainId: string;
	mountainName: string;
}

/** Mountains */
export type MountainRow = {
	id?: string;
	name: string;
	city: string;
	state: string;
	latitude: number | null;
	longitude: number | null;
	height: number | 0;
	phoneNumber?: string | null;
	address?: string | null;
	zipcode?: string | null;
	openingDate?: string | Date | null;
	closingDate?: string | Date | null;
	isNew?: boolean;
};

export interface BaseMountainsTableAgGridProps {
	mountains: MountainDTO[];
	fetchMountains: () => Promise<void>;
	isLoading: boolean;
}

export interface MountainsTableAgGridProps extends BaseMountainsTableAgGridProps {
	updateMountain: UpdateEntityHandler<MountainInputPayload, MountainDTO>;
	deleteMountain: (mountainId: string) => Promise<void>;
	onEditMountain?: (mountain: MountainDTO) => void;
	onAddMountain?: AddEntityHandler<MountainInputPayload, MountainDTO>;
}

/** Weather */
export type WeatherRow = {
	id?: string;
	mountainId: string;
	date: string;
	temperature: number;
	windSpeed?: number | null;
	windDirection?: string | null;
	visibility?: number | null;
	conditions?: string | null;
	snowfallRecent?: number | null;
	snowfall24h?: number | null;
	snowfall7d?: number | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface WeatherTableAgGridProps {
	weather: WeatherDTO[];
	fetchWeather: () => Promise<void>;
	isLoading: boolean;
	updateWeather: UpdateEntityHandler<WeatherDTO, WeatherDTO>;
	deleteWeather: (weatherId: string) => Promise<void>;
	onEditWeather?: (weather: WeatherDTO) => void;
	onAddWeather?: AddEntityHandler<WeatherDTO, WeatherDTO>;
	mountainId: string;
	mountainName: string;
}

/** Hours */
export type HoursRow = {
	id?: string;
	locationId: string;
	dayOfWeek?: number | null;
	date?: string | null;
	openTime?: string | null;
	closeTime?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface HoursTableAgGridProps {
	hours: HoursDTO[];
	fetchHours: () => Promise<void>;
	isLoading: boolean;
	updateHours: UpdateEntityHandler<HoursDTO, HoursDTO>;
	deleteHours: (hoursId: string) => Promise<void>;
	onEditHours?: (hours: HoursDTO) => void;
	onAddHours?: AddEntityHandler<HoursDTO, HoursDTO>;
	mountainId: string;
	mountainName: string;
}

/** Areas */
export type AreaRow = {
	id?: string;
	name: string;
	type: AREA_TYPE;
	description?: string | null;
	mountainId?: string | null;
	isNew?: boolean;
};

export interface BaseAreasTableAgGridProps {
	areas: AreaDTO[];
	fetchAreas: () => Promise<void>;
	updateArea: UpdateEntityHandler<AreaDTO, AreaDTO>;
	isLoading: boolean;
	mountainId: string;
	mountainName: string;
}
export interface AreasTableAgGridProps extends BaseAreasTableAgGridProps {
	deleteArea: (areaId: string) => Promise<void>;
	onEditArea?: (area: AreaDTO) => void;
	onAddArea?: AddEntityHandler<AreaDTO, AreaDTO>;
}

/** Aid Rooms */
export type AidRoomRow = {
	id?: string;
	name: string;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
	areaId?: string;
	isNew?: boolean;
};

export interface BaseAidRoomsTableAgGridProps {
	aidRooms: AidRoomWithLocation[];
	fetchAidRooms: () => Promise<void>;
	updateAidRoom: UpdateEntityHandler<AidRoomInputPayload, AidRoomWithLocation>;
	isLoading: boolean;
	mountainId: string;
	mountainName: string;
}
export interface AidRoomsTableAgGridProps extends BaseAidRoomsTableAgGridProps {
	deleteAidRoom: (aidRoomId: string) => Promise<void>;
	onEditAidRoom?: (aidRoom: AidRoomWithLocation) => void;
	onAddAidRoom?: AddEntityHandler<AidRoomInputPayload, AidRoomWithLocation>;
}

/** Aid Room Checks */
export type AidRoomCheckRow = {
	id?: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	aidRoomId: string;
	notes?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface AidRoomChecksTableAgGridProps {
	aidRoomChecks: AidRoomCheckDTO[];
	fetchAidRoomChecks: () => Promise<void>;
	isLoading: boolean;
	updateAidRoomCheck: UpdateEntityHandler<AidRoomCheckDTO, AidRoomCheckDTO>;
	deleteAidRoomCheck: (checkId: string) => Promise<void>;
	onEditAidRoomCheck?: (check: AidRoomCheckDTO) => void;
	onAddAidRoomCheck?: AddEntityHandler<AidRoomCheckDTO, AidRoomCheckDTO>;
	mountainId: string;
	mountainName: string;
}

/** Huts */
export type HutRow = {
	id?: string;
	name: string;
	status: STATUS;
	latitude: number | null;
	longitude: number | null;
	areaId?: string;
	isNew?: boolean;
};

export interface BaseHutsTableAgGridProps {
	huts: HutWithLocation[];
	fetchHuts: () => Promise<void>;
	updateHut: UpdateEntityHandler<HutInputPayload, HutWithLocation>;
	isLoading: boolean;
	mountainId: string;
	mountainName: string;
}
export interface HutsTableAgGridProps extends BaseHutsTableAgGridProps {
	deleteHut: (hutId: string) => Promise<void>;
	onEditHut?: (hut: HutWithLocation) => void;
	onAddHut?: AddEntityHandler<HutInputPayload, HutWithLocation>;
}

/** Hut Checks */
export type HutCheckRow = {
	id?: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	hutId: string;
	notes?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface HutChecksTableAgGridProps {
	hutChecks: HutCheckDTO[];
	fetchHutChecks: () => Promise<void>;
	isLoading: boolean;
	updateHutCheck: UpdateEntityHandler<HutCheckDTO, HutCheckDTO>;
	deleteHutCheck: (checkId: string) => Promise<void>;
	onEditHutCheck?: (check: HutCheckDTO) => void;
	onAddHutCheck?: AddEntityHandler<HutCheckDTO, HutCheckDTO>;
	mountainId: string;
	mountainName: string;
}

/** Lifts */
export type LiftRow = {
	id?: string;
	name: string;
	status: STATUS;
	type: LIFT_TYPE;
	capacity: number;
	latitude: number | null;
	longitude: number | null;
	areaId?: string;
	isNew?: boolean;
};

export interface BaseLiftsTableAgGridProps {
	lifts: LiftWithLocation[];
	fetchLifts: () => Promise<void>;
	updateLift: UpdateEntityHandler<LiftInputPayload, LiftWithLocation>;
	isLoading: boolean;
	mountainId: string;
	mountainName: string;
}
export interface LiftsTableAgGridProps extends BaseLiftsTableAgGridProps {
	deleteLift: (liftId: string) => Promise<void>;
	onEditLift?: (lift: LiftWithLocation) => void;
	onAddLift?: AddEntityHandler<LiftInputPayload, LiftWithLocation>;
}

/** Lift Checks */
export type LiftCheckRow = {
	id?: string;
	recordedAt: string;
	employeeId: string;
	mountainId: string;
	liftId: string;
	notes?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;
	isNew?: boolean;
};

export interface LiftChecksTableAgGridProps {
	liftChecks: LiftCheckDTO[];
	fetchLiftChecks: () => Promise<void>;
	isLoading: boolean;
	updateLiftCheck: UpdateEntityHandler<LiftCheckDTO, LiftCheckDTO>;
	deleteLiftCheck: (checkId: string) => Promise<void>;
	onEditLiftCheck?: (check: LiftCheckDTO) => void;
	onAddLiftCheck?: AddEntityHandler<LiftCheckDTO, LiftCheckDTO>;
	mountainId: string;
	mountainName: string;
}

/** Lodges */
export type LodgeRow = {
	id?: string;
	name: string;
	status: STATUS;
	capacity: number;
	latitude: number | null;
	longitude: number | null;
	areaId?: string;
	isNew?: boolean;
};

export interface BaseLodgesTableAgGridProps {
	lodges: LodgeWithLocation[];
	fetchLodges: () => Promise<void>;
	updateLodge: UpdateEntityHandler<LodgeInputPayload, LodgeWithLocation>;
	isLoading: boolean;
	mountainId: string;
	mountainName: string;
}
export interface LodgesTableAgGridProps extends BaseLodgesTableAgGridProps {
	deleteLodge: (lodgeId: string) => Promise<void>;
	onEditLodge?: (lodge: LodgeWithLocation) => void;
	onAddLodge?: AddEntityHandler<LodgeInputPayload, LodgeWithLocation>;
}

/** Trails */
export type TrailRow = {
	id?: string;
	name: string;
	difficulty: TRAIL_DIFFICULTY;
	status: STATUS;
	condition: TRAIL_CONDITION;
	length: number;
	latitude: number | null;
	longitude: number | null;
	areaId?: string;
	isNew?: boolean;
};

export interface BaseTrailsTableAgGridProps {
	trails: TrailWithLocation[];
	fetchTrails: () => Promise<void>;
	updateTrail: UpdateEntityHandler<TrailInputPayload, TrailWithLocation>;
	isLoading: boolean;
	mountainId: string;
	mountainName: string;
}

export interface TrailsTableAgGridProps extends BaseTrailsTableAgGridProps {
	deleteTrail: (trailId: string) => Promise<void>;
	onEditTrail?: (trail: TrailWithLocation) => void;
	onAddTrail?: AddEntityHandler<TrailInputPayload, TrailWithLocation>;
}

/** Trail Checks */
export type TrailCheckRow = {
	id?: string;
	
	notes?: string | null;
	isNew?: boolean;
};

export interface TrailChecksTableAgGridProps {
	trailChecks: TrailCheckDTO[];
	fetchTrailChecks: () => Promise<void>;
	isLoading: boolean;
	updateTrailCheck: UpdateEntityHandler<TrailCheckDTO, TrailCheckDTO>;
	deleteTrailCheck: (checkId: string) => Promise<void>;
	onEditTrailCheck?: (check: TrailCheckDTO) => void;
	onAddTrailCheck?: AddEntityHandler<TrailCheckDTO, TrailCheckDTO>;
	mountainId: string;
	mountainName: string;
}

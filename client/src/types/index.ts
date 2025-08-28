// AUTO-GENERATED FILE. DO NOT EDIT.
// Run server/scripts/generate-types.ts to update.

import {
  LOCATION_TYPE,
  STATUS,
  INCIDENT_STATUS,
  EQUIPMENT_STATUS,
  LIFT_TYPE,
  TRAIL_CONDITION,
  TRAIL_DIFFICULTY,
  DEPARTMENT,
  AREA_TYPE,
  EMPLOYEE_STATUS,
  ROLE_LEVEL,
  PRECIPITATION_TYPE
} from './generated-enums';

export interface AreaDTO {
  id: string;
  mountainId: string;
  name: string;
  type: AREA_TYPE;
  description?: string | null;
  mountain: MountainDTO | null;
  locations: LocationDTO[];
}

export interface LocationDTO {
  id: string;
  mountainId: string;
  name: string;
  areaId?: string | null;
  area?: AreaDTO | null | null;
  entityId: string;
  entityType: LOCATION_TYPE;
  mountain: MountainDTO | null;
  lift?: LiftDTO | null | null;
  trail?: TrailDTO | null | null;
  hut?: HutDTO | null | null;
  lodge?: LodgeDTO | null | null;
  aidRoom?: AidRoomDTO | null | null;
  hours: HoursDTO[];
  equipment: EquipmentDTO[];
  incidents: IncidentDTO[];
}

export interface HoursDTO {
  id: string;
  locationId: string;
  location: LocationDTO | null;
  dayOfWeek?: number | null;
  date?: string | null;
  openTime?: string | null;
  closeTime?: string | null;
  status: STATUS;
  createdAt: string;
  updatedAt: string;
}

export interface MountainDTO {
  id: string;
  name: string;
  latitude?: number | null;
  longitude?: number | null;
  height: number;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  openingDate?: string | null;
  closingDate?: string | null;
  weather: WeatherDTO[];
  locations: LocationDTO[];
  areas: AreaDTO[];
  aidRooms: AidRoomDTO[];
  huts: HutDTO[];
  lodges: LodgeDTO[];
  lifts: LiftDTO[];
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
}

export interface WeatherDTO {
  id: string;
  mountainId: string;
  mountain: MountainDTO | null;
  date: string;
  temperature: number;
  feelsLikeTemperature?: number | null;
  humidity?: number | null;
  dewPoint?: number | null;
  windSpeed?: number | null;
  windDirection?: string | null;
  windGust?: number | null;
  visibility?: number | null;
  conditions?: string | null;
  snowfallRecent?: number | null;
  snowfall24h?: number | null;
  snowfall7d?: number | null;
  snowDepthBase?: number | null;
  snowDepthSummit?: number | null;
  isSnowmakingPossible?: boolean | null;
  precipitationType?: PRECIPITATION_TYPE | null;
  precipitationIntensity?: number | null;
  precipitationChance?: number | null;
  stormWarning?: boolean | null;
  cloudCoverage?: number | null;
  uvIndex?: number | null;
  sunriseTime?: string | null;
  sunsetTime?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeMountainAssignmentDTO {
  id: string;
  employeeId: string;
  mountainId: string;
  startDate: string;
  endDate?: string | null;
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
}

export interface DispatcherAssignmentDTO {
  id: string;
  employeeId: string;
  mountainId: string;
  assignedAt: string;
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
}

export interface RoleDTO {
  id: string;
  department: DEPARTMENT;
  title: string;
  position: string;
  level: ROLE_LEVEL;
  permissions: string;
  employees: EmployeeDTO[];
  employeeRole: EmployeeRoleDTO[];
}

export interface EmployeeRoleDTO {
  id: string;
  employeeId: string;
  roleId: string;
  employee: EmployeeDTO | null;
  role: RoleDTO | null;
}

export interface CertificationDTO {
  id: string;
  name: string;
  issuedBy?: string | null;
  issuedAt?: string | null;
  expiresAt?: string | null;
  employeeId: string;
  employee: EmployeeDTO | null;
}

export interface EmployeeDTO {
  id: string;
  employeeIdNumber?: number | null;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber?: string | null;
  status: EMPLOYEE_STATUS;
  primaryDepartment?: DEPARTMENT | null;
  roleId?: string | null;
  role?: RoleDTO | null | null;
  startDate?: string | null;
  endDate?: string | null;
  certifications: CertificationDTO[];
  additionalRoles: EmployeeRoleDTO[];
  mountainAssignments: EmployeeMountainAssignmentDTO[];
  dispatcherAssignments: DispatcherAssignmentDTO[];
  incidents: IncidentDTO[];
  aidRoomChecks: AidRoomCheckDTO[];
  hutChecks: HutCheckDTO[];
  liftChecks: LiftCheckDTO[];
  trailChecks: TrailCheckDTO[];
  equipmentChecks: EquipmentCheckDTO[];
  equipmentServiceLogs: EquipmentServiceLogDTO[];
}

export interface LiftDTO {
  id: string;
  mountainId: string;
  name: string;
  type: LIFT_TYPE;
  status: STATUS;
  capacity: number;
  latitude?: number | null;
  longitude?: number | null;
  mountain: MountainDTO | null;
  liftChecks: LiftCheckDTO[];
  locationId?: string | null;
  location?: LocationDTO | null | null;
}

export interface TrailDTO {
  id: string;
  mountainId: string;
  name: string;
  difficulty: TRAIL_DIFFICULTY;
  status: STATUS;
  length?: number | 0;
  latitude?: number | null;
  longitude?: number | null;
  condition: TRAIL_CONDITION;
  mountain: MountainDTO | null;
  trailChecks: TrailCheckDTO[];
  locationId?: string | null;
  location?: LocationDTO | null | null;
}

export interface LodgeDTO {
  id: string;
  mountainId: string;
  name: string;
  capacity: number;
  latitude?: number | null;
  longitude?: number | null;
  status: STATUS;
  mountain: MountainDTO | null;
  locationId?: string | null;
  location?: LocationDTO | null | null;
}

export interface HutDTO {
  id: string;
  mountainId: string;
  name: string;
  status: STATUS;
  latitude?: number | null;
  longitude?: number | null;
  mountain: MountainDTO | null;
  hutChecks: HutCheckDTO[];
  locationId?: string | null;
  location?: LocationDTO | null | null;
}

export interface AidRoomDTO {
  id: string;
  // mountainId: string;
  name: string;
  status: STATUS;
  latitude?: number | null;
  longitude?: number | null;
  mountain: MountainDTO | null;
  aidRoomChecks: AidRoomCheckDTO[];
  locationId?: string | null;
  location?: LocationDTO | null | null;
}

export interface EquipmentServiceLogDTO {
  id: string;
  mountainId: string;
  equipmentId: string;
  employeeId?: string | null;
  status: EQUIPMENT_STATUS;
  changedAt: string;
  notes?: string | null;
  mountain: MountainDTO | null;
  employee?: EmployeeDTO | null | null;
  equipment: EquipmentDTO | null;
  createdAt: string;
  updatedAt: string;
}

export interface EquipmentDTO {
  id: string;
  name: string;
  type: string;
  status: EQUIPMENT_STATUS;
  number?: number | null;
  description?: string | null;
  picture?: string | null;
  cost?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  mountainId?: string | null;
  mountain?: MountainDTO | null | null;
  locationId?: string | null;
  location?: LocationDTO | null | null;
  dateAdded: string;
  incidentEquipmentUsageLogs: IncidentEquipmentUsageLogDTO[];
  equipmentChecks: EquipmentCheckDTO[];
  equipmentServiceLogs: EquipmentServiceLogDTO[];
}

export interface IncidentDTO {
  id: string;
  description: string;
  status: INCIDENT_STATUS;
  latitude?: number | null;
  longitude?: number | null;
  mountainId: string;
  mountain: MountainDTO | null;
  startTime: string;
  endTime?: string | null;
  callTime?: string | null;
  onSceneTime?: string | null;
  stableTime?: string | null;
  transportTime?: string | null;
  emptyRun: boolean;
  emptyRunAt?: string | null;
  incidentEquipmentUsageLog: IncidentEquipmentUsageLogDTO[];
  locationId: string;
  location: LocationDTO | null;
  employees: EmployeeDTO[];
}

export interface IncidentEquipmentUsageLogDTO {
  id: string;
  usedAt: string;
  notes?: string | null;
  mountainId: string;
  equipmentId: string;
  incidentId: string;
  mountain: MountainDTO | null;
  incident: IncidentDTO | null;
  equipment: EquipmentDTO | null;
  createdAt: string;
  updatedAt: string;
}

export interface AidRoomCheckDTO {
  id: string;
  employeeId: string;
  employee: EmployeeDTO | null;
  mountainId: string;
  mountain: MountainDTO | null;
  aidRoomId: string;
  aidRoom: AidRoomDTO | null;
  equipmentIssues: boolean;
  equipmentNotes?: string | null;
  paperworkStocked: boolean;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HutCheckDTO {
  id: string;
  employeeId: string;
  employee: EmployeeDTO | null;
  mountainId: string;
  mountain: MountainDTO | null;
  hutId: string;
  hut: HutDTO | null;
  equipmentIssues: boolean;
  equipmentNotes?: string | null;
  paperworkStocked: boolean;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LiftCheckDTO {
  id: string;
  employeeId: string;
  employee: EmployeeDTO | null;
  mountainId: string;
  mountain: MountainDTO | null;
  liftId: string;
  lift: LiftDTO | null;
  hazards: boolean;
  status: STATUS;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TrailCheckDTO {
  id: string;
  employeeId: string;
  employee: EmployeeDTO | null;
  mountainId: string;
  mountain: MountainDTO | null;
  trailId: string;
  trail: TrailDTO | null;
  status: STATUS;
  condition: TRAIL_CONDITION;
  hazards: boolean;
  snowmaking: boolean;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EquipmentCheckDTO {
  id: string;
  employeeId: string;
  employee: EmployeeDTO | null;
  mountainId: string;
  mountain: MountainDTO | null;
  equipmentId: string;
  equipment: EquipmentDTO | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AreaFull = AreaDTO & {
  mountain: MountainDTO | null;
  locations: LocationDTO[];
};

export type LocationFull = LocationDTO & {
  area: AreaDTO | null;
  mountain: MountainDTO | null;
  lift: LiftDTO | null;
  trail: TrailDTO | null;
  hut: HutDTO | null;
  lodge: LodgeDTO | null;
  aidRoom: AidRoomDTO | null;
  hours: HoursDTO[];
  equipment: EquipmentDTO[];
  incidents: IncidentDTO[];
};

export type HoursFull = HoursDTO & {
  location: LocationDTO | null;
};

export type MountainFull = MountainDTO & {
  weather: WeatherDTO[];
  locations: LocationDTO[];
  areas: AreaDTO[];
  aidRooms: AidRoomDTO[];
  huts: HutDTO[];
  lodges: LodgeDTO[];
  lifts: LiftDTO[];
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

export type WeatherFull = WeatherDTO & {
  mountain: MountainDTO | null;
};

export type EmployeeMountainAssignmentFull = EmployeeMountainAssignmentDTO & {
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
};

export type DispatcherAssignmentFull = DispatcherAssignmentDTO & {
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
};

export type RoleFull = RoleDTO & {
  employees: EmployeeDTO[];
  employeeRole: EmployeeRoleDTO[];
};

export type EmployeeRoleFull = EmployeeRoleDTO & {
  employee: EmployeeDTO | null;
  role: RoleDTO | null;
};

export type CertificationFull = CertificationDTO & {
  employee: EmployeeDTO | null;
};

export type EmployeeFull = EmployeeDTO & {
  role: RoleDTO | null;
  certifications: CertificationDTO[];
  additionalRoles: EmployeeRoleDTO[];
  mountainAssignments: EmployeeMountainAssignmentDTO[];
  dispatcherAssignments: DispatcherAssignmentDTO[];
  incidents: IncidentDTO[];
  aidRoomChecks: AidRoomCheckDTO[];
  hutChecks: HutCheckDTO[];
  liftChecks: LiftCheckDTO[];
  trailChecks: TrailCheckDTO[];
  equipmentChecks: EquipmentCheckDTO[];
  equipmentServiceLogs: EquipmentServiceLogDTO[];
};

export type LiftFull = LiftDTO & {
  mountain: MountainDTO | null;
  liftChecks: LiftCheckDTO[];
  location: LocationDTO | null;
};

export type TrailFull = TrailDTO & {
  mountain: MountainDTO | null;
  trailChecks: TrailCheckDTO[];
  location: LocationDTO | null;
};

export type LodgeFull = LodgeDTO & {
  mountain: MountainDTO | null;
  location: LocationDTO | null;
};

export type HutFull = HutDTO & {
  mountain: MountainDTO | null;
  hutChecks: HutCheckDTO[];
  location: LocationDTO | null;
};

export type AidRoomFull = AidRoomDTO & {
  mountain: MountainDTO | null;
  aidRoomChecks: AidRoomCheckDTO[];
  location: LocationDTO | null;
};

export type EquipmentServiceLogFull = EquipmentServiceLogDTO & {
  mountain: MountainDTO | null;
  employee: EmployeeDTO | null;
  equipment: EquipmentDTO | null;
};

export type EquipmentFull = EquipmentDTO & {
  mountain: MountainDTO | null;
  location: LocationDTO | null;
  incidentEquipmentUsageLogs: IncidentEquipmentUsageLogDTO[];
  equipmentChecks: EquipmentCheckDTO[];
  equipmentServiceLogs: EquipmentServiceLogDTO[];
};

export type IncidentFull = IncidentDTO & {
  mountain: MountainDTO | null;
  incidentEquipmentUsageLog: IncidentEquipmentUsageLogDTO[];
  location: LocationDTO | null;
  employees: EmployeeDTO[];
};

export type IncidentEquipmentUsageLogFull = IncidentEquipmentUsageLogDTO & {
  mountain: MountainDTO | null;
  incident: IncidentDTO | null;
  equipment: EquipmentDTO | null;
};

export type AidRoomCheckFull = AidRoomCheckDTO & {
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
  aidRoom: AidRoomDTO | null;
};

export type HutCheckFull = HutCheckDTO & {
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
  hut: HutDTO | null;
};

export type LiftCheckFull = LiftCheckDTO & {
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
  lift: LiftDTO | null;
};

export type TrailCheckFull = TrailCheckDTO & {
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
  trail: TrailDTO | null;
};

export type EquipmentCheckFull = EquipmentCheckDTO & {
  employee: EmployeeDTO | null;
  mountain: MountainDTO | null;
  equipment: EquipmentDTO | null;
};

export type HoursWithLocation = HoursDTO & {
  location?: LocationDTO | null;
};

export type LiftWithLocation = LiftDTO & {
  location?: LocationDTO | null;
};

export type TrailWithLocation = TrailDTO & {
  location?: LocationDTO | null;
};

export type LodgeWithLocation = LodgeDTO & {
  location?: LocationDTO | null;
};

export type HutWithLocation = HutDTO & {
  location?: LocationDTO | null;
};

export type AidRoomWithLocation = AidRoomDTO & {
  location?: LocationDTO | null;
};

export type EquipmentWithLocation = EquipmentDTO & {
  location?: LocationDTO | null;
};

export type IncidentWithLocation = IncidentDTO & {
  location?: LocationDTO | null;
};


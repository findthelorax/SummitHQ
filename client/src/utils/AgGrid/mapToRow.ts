import { parseCoordinate } from '../common/formatData';
import type {
	DEPARTMENT,
	STATUS,
	EQUIPMENT_STATUS,
	LIFT_TYPE,
	EMPLOYEE_STATUS,
	TRAIL_CONDITION,
	TRAIL_DIFFICULTY,
	ROLE_LEVEL,
	AREA_TYPE,
	INCIDENT_STATUS,
} from '../../types/generated-enums';
import {
	EquipmentRow,
	LiftRow,
	TrailRow,
	LodgeRow,
	HutRow,
	AidRoomRow,
	MountainRow,
	RoleRow,
	AreaRow,
	WeatherRow,
	HoursRow,
	EmployeeRow,
	IncidentRow,
	EquipmentCheckRow,
	EquipmentServiceLogRow,
	IncidentEquipmentUsageLogRow,
	AidRoomCheckRow,
	HutCheckRow,
	LiftCheckRow,
	TrailCheckRow,
} from './tableTypes';

import {
	LiftWithLocation,
	TrailWithLocation,
	LodgeWithLocation,
	HutWithLocation,
	AidRoomWithLocation,
	EquipmentWithLocation,
	MountainDTO,
	RoleDTO,
	AreaDTO,
	WeatherDTO,
	HoursDTO,
	EmployeeDTO,
	IncidentDTO,
	EquipmentCheckDTO,
	EquipmentServiceLogDTO,
	IncidentEquipmentUsageLogDTO,
	AidRoomCheckDTO,
	HutCheckDTO,
	LiftCheckDTO,
	TrailCheckDTO,
} from '../../types/index';

// Equipment
export function mapEquipmentToRow(equipment: EquipmentWithLocation): EquipmentRow {
	return {
		id: equipment.id,
		name: equipment.name,
		type: equipment.type,
		number: equipment.number,
		description: equipment.description,
		status: equipment.status as EQUIPMENT_STATUS,
		picture: equipment.picture,
		cost: equipment.cost,
		latitude: parseCoordinate(equipment.latitude),
		longitude: parseCoordinate(equipment.longitude),
		mountainId: equipment.mountainId ?? null,
		locationId: equipment.location?.id ?? null,
		areaId: equipment.location?.area?.id ?? null,
		dateAdded: equipment.dateAdded ? new Date(equipment.dateAdded) : undefined,
	};
}

// AidRoom
export function mapAidRoomToRow(aidRoom: AidRoomWithLocation): AidRoomRow {
	return {
		id: aidRoom.id,
		name: aidRoom.name,
		status: aidRoom.status as STATUS,
		areaId: aidRoom.location?.area?.id ?? '',
		latitude: parseCoordinate(aidRoom.latitude),
		longitude: parseCoordinate(aidRoom.longitude),
	};
}

// Hut
export function mapHutToRow(hut: HutWithLocation): HutRow {
	return {
		id: hut.id,
		name: hut.name,
		status: hut.status as STATUS,
		areaId: hut.location?.area?.id ?? '',
		latitude: parseCoordinate(hut.latitude),
		longitude: parseCoordinate(hut.longitude),
	};
}

// Lift
export function mapLiftToRow(lift: LiftWithLocation): LiftRow {
	return {
		id: lift.id,
		name: lift.name,
		status: lift.status as STATUS,
		type: lift.type as LIFT_TYPE,
		areaId: lift.location?.areaId ?? '',
		capacity: lift.capacity,
		latitude: parseCoordinate(lift.latitude),
		longitude: parseCoordinate(lift.longitude),
	};
}

// Lodge
export function mapLodgeToRow(lodge: LodgeWithLocation): LodgeRow {
	return {
		id: lodge.id,
		name: lodge.name,
		status: lodge.status as STATUS,
		areaId: lodge.location?.areaId ?? '',
		capacity: lodge.capacity,
		latitude: parseCoordinate(lodge.latitude),
		longitude: parseCoordinate(lodge.longitude),
	};
}

// Trail
export function mapTrailToRow(trail: TrailWithLocation): TrailRow {
	return {
		id: trail.id,
		name: trail.name,
		difficulty: trail.difficulty as TRAIL_DIFFICULTY,
		status: trail.status as STATUS,
		condition: trail.condition as TRAIL_CONDITION,
		areaId: trail.location?.areaId ? String(trail.location.areaId) : '',
		length: trail.length ?? 0,
		latitude: parseCoordinate(trail.latitude),
		longitude: parseCoordinate(trail.longitude),
	};
}

// Mountain
export function mapMountainToRow(mountain: MountainDTO): MountainRow {
	return {
		id: mountain.id,
		name: mountain.name,
		city: mountain.city ?? '',
		state: mountain.state ?? '',
		latitude: parseCoordinate(mountain.latitude),
		longitude: parseCoordinate(mountain.longitude),
		height: mountain.height ?? 0,
		phoneNumber: mountain.phoneNumber ?? '',
		address: mountain.address ?? '',
		zipcode: mountain.zipcode ?? '',
		openingDate: mountain.openingDate ? new Date(mountain.openingDate) : undefined,
		closingDate: mountain.closingDate ? new Date(mountain.closingDate) : undefined,
	};
}

// Role
export function mapRoleToRow(role: RoleDTO): RoleRow {
	return {
		id: role.id,
		department: role.department as DEPARTMENT,
		title: role.title,
		position: role.position,
		level: role.level as ROLE_LEVEL,
		permissions: Array.isArray(role.permissions) ? role.permissions : [],
	};
}

// Area
export function mapAreaToRow(area: AreaDTO): AreaRow {
	return {
		id: area.id,
		name: area.name,
		type: area.type as AREA_TYPE,
		description: area.description ?? '',
		mountainId: area.mountainId ?? null,
	};
}

// Weather
export function mapWeatherToRow(weather: WeatherDTO): WeatherRow {
	return {
		id: weather.id,
		mountainId: weather.mountainId,
		date: weather.date ? new Date(weather.date).toISOString() : '',
		temperature: weather.temperature,
		windSpeed: weather.windSpeed ?? null,
		windDirection: weather.windDirection ?? null,
		visibility: weather.visibility ?? null,
		conditions: weather.conditions ?? '',
		snowfallRecent: weather.snowfallRecent ?? null,
		snowfall24h: weather.snowfall24h ?? null,
		snowfall7d: weather.snowfall7d ?? null,
		createdAt: weather.createdAt ? new Date(weather.createdAt).toISOString() : null,
		updatedAt: weather.updatedAt ? new Date(weather.updatedAt).toISOString() : null,
	};
}

// Hours
export function mapHoursToRow(hours: HoursDTO): HoursRow {
	return {
		id: hours.id,
		locationId: hours.locationId,
		dayOfWeek: hours.dayOfWeek ?? null,
		date: hours.date ? new Date(hours.date).toISOString() : null,
		openTime: hours.openTime ? new Date(hours.openTime).toISOString() : null,
		closeTime: hours.closeTime ? new Date(hours.closeTime).toISOString() : null,
		createdAt: hours.createdAt ? new Date(hours.createdAt).toISOString() : null,
		updatedAt: hours.updatedAt ? new Date(hours.updatedAt).toISOString() : null,
	};
}

// Employee
export function mapEmployeeToRow(employee: EmployeeDTO): EmployeeRow {
    return {
        id: employee.id ?? '',
        employeeIdNumber: employee.employeeIdNumber ?? 0,
        firstName: employee.firstName ?? '',
        lastName: employee.lastName ?? '',
        email: employee.email ?? '',
        phoneNumber: employee.phoneNumber ?? '',
        status: employee.status as EMPLOYEE_STATUS,
        primaryDepartment: employee.primaryDepartment as DEPARTMENT,
        roleId: employee.roleId ?? '',
        startDate: employee.startDate ? new Date(employee.startDate).toISOString() : '',
        endDate: employee.endDate ? new Date(employee.endDate).toISOString() : '',
        mountainId: employee.mountainAssignments?.[0]?.mountainId ?? '',
        isNew: false,

        // Derived fields
        roleDepartment: employee.role?.department ?? '' as DEPARTMENT,
        roleTitle: employee.role?.title ?? '',
        rolePosition: employee.role?.position ?? '',
        roleLevel: employee.role?.level ?? '' as ROLE_LEVEL,
        rolePermissions: employee.role?.permissions?.join(', ') ?? '',
        certifications: employee.certifications?.map((c) => c.name).join(', ') ?? '',
        assignedMountainName: employee.mountainAssignments?.[0]?.mountain?.name ?? '',
        assignedMountainCity: employee.mountainAssignments?.[0]?.mountain?.city ?? '',
        assignedMountainState: employee.mountainAssignments?.[0]?.mountain?.state ?? '',
    };
}

// Incident
export function mapIncidentToRow(incident: IncidentDTO): IncidentRow {
	return {
		id: incident.id,
		description: incident.description,
		status: incident.status as INCIDENT_STATUS,
		latitude: parseCoordinate(incident.latitude),
		longitude: parseCoordinate(incident.longitude),
		mountainId: incident.mountainId,
		locationId: incident.locationId,
		startTime: incident.startTime ? new Date(incident.startTime).toISOString() : '',
		endTime: incident.endTime ? new Date(incident.endTime).toISOString() : null,
		onSceneTime: incident.onSceneTime ? new Date(incident.onSceneTime).toISOString() : null,
		stableTime: incident.stableTime ? new Date(incident.stableTime).toISOString() : null,
		transportTime: incident.transportTime ? new Date(incident.transportTime).toISOString() : null,
		emptyRun: incident.emptyRun ?? null,
		emptyRunAt: incident.emptyRunAt ? new Date(incident.emptyRunAt).toISOString() : null,
	};
}

// EquipmentCheck
export function mapEquipmentCheckToRow(check: EquipmentCheckDTO): EquipmentCheckRow {
	return {
		id: check.id,
		recordedAt: check.recordedAt ? new Date(check.recordedAt).toISOString() : '',
		employeeId: check.employeeId,
		mountainId: check.mountainId,
		equipmentId: check.equipmentId,
		notes: check.notes ?? '',
		createdAt: check.createdAt ? new Date(check.createdAt).toISOString() : null,
		updatedAt: check.updatedAt ? new Date(check.updatedAt).toISOString() : null,
	};
}

// EquipmentServiceLog
export function mapEquipmentServiceLogToRow(log: EquipmentServiceLogDTO): EquipmentServiceLogRow {
	return {
		id: log.id,
		mountainId: log.mountainId,
		equipmentId: log.equipmentId,
		employeeId: log.employeeId ?? null,
		status: log.status,
		changedAt: log.changedAt ? new Date(log.changedAt).toISOString() : '',
		notes: log.notes ?? '',
		createdAt: log.createdAt ? new Date(log.createdAt).toISOString() : null,
		updatedAt: log.updatedAt ? new Date(log.updatedAt).toISOString() : null,
	};
}

// IncidentEquipmentUsageLog
export function mapIncidentEquipmentUsageLogToRow(log: IncidentEquipmentUsageLogDTO): IncidentEquipmentUsageLogRow {
	return {
		id: log.id,
		usedAt: log.usedAt ? new Date(log.usedAt).toISOString() : '',
		notes: log.notes ?? '',
		mountainId: log.mountainId,
		equipmentId: log.equipmentId,
		incidentId: log.incidentId,
		createdAt: log.createdAt ? new Date(log.createdAt).toISOString() : null,
		updatedAt: log.updatedAt ? new Date(log.updatedAt).toISOString() : null,
	};
}

// AidRoomCheck
export function mapAidRoomCheckToRow(check: AidRoomCheckDTO): AidRoomCheckRow {
	return {
		id: check.id,
		recordedAt: check.recordedAt ? new Date(check.recordedAt).toISOString() : '',
		employeeId: check.employeeId,
		mountainId: check.mountainId,
		aidRoomId: check.aidRoomId,
		notes: check.notes ?? '',
		createdAt: check.createdAt ? new Date(check.createdAt).toISOString() : null,
		updatedAt: check.updatedAt ? new Date(check.updatedAt).toISOString() : null,
	};
}

// HutCheck
export function mapHutCheckToRow(check: HutCheckDTO): HutCheckRow {
	return {
		id: check.id,
		recordedAt: check.recordedAt ? new Date(check.recordedAt).toISOString() : '',
		employeeId: check.employeeId,
		mountainId: check.mountainId,
		hutId: check.hutId,
		notes: check.notes ?? '',
		createdAt: check.createdAt ? new Date(check.createdAt).toISOString() : null,
		updatedAt: check.updatedAt ? new Date(check.updatedAt).toISOString() : null,
	};
}

// LiftCheck
export function mapLiftCheckToRow(check: LiftCheckDTO): LiftCheckRow {
	return {
		id: check.id,
		recordedAt: check.recordedAt ? new Date(check.recordedAt).toISOString() : '',
		employeeId: check.employeeId,
		mountainId: check.mountainId,
		liftId: check.liftId,
		notes: check.notes ?? '',
		createdAt: check.createdAt ? new Date(check.createdAt).toISOString() : null,
		updatedAt: check.updatedAt ? new Date(check.updatedAt).toISOString() : null,
	};
}

// TrailCheck
export function mapTrailCheckToRow(check: TrailCheckDTO): TrailCheckRow {
	return {
		id: check.id,
		recordedAt: check.recordedAt ? new Date(check.recordedAt).toISOString() : '',
		employeeId: check.employeeId,
		mountainId: check.mountainId,
		trailId: check.trailId,
		notes: check.notes ?? '',
		createdAt: check.createdAt ? new Date(check.createdAt).toISOString() : null,
		updatedAt: check.updatedAt ? new Date(check.updatedAt).toISOString() : null,
	};
}

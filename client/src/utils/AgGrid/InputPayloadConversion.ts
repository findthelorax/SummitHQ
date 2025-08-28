import {
	TRAIL_DIFFICULTY,
	STATUS,
	TRAIL_CONDITION,
	LIFT_TYPE,
	EQUIPMENT_STATUS,
	DEPARTMENT,
	EMPLOYEE_STATUS,
	ROLE_LEVEL,
	AREA_TYPE,
	INCIDENT_STATUS,
} from '../../types/generated-enums';
import {
	EquipmentRow,
	EquipmentCheckRow,
	EquipmentServiceLogRow,
	EmployeeRow,
	IncidentRow,
	RoleRow,
	MountainRow,
	AreaRow,
	AidRoomRow,
	AidRoomCheckRow,
	HutRow,
	HutCheckRow,
	LiftRow,
	LiftCheckRow,
	LodgeRow,
	TrailRow,
	TrailCheckRow,
} from './tableTypes';

import type { EquipmentInputPayload } from '../../api/EquipmentAPI';
// import type { EquipmentCheckInputPayload } from '../../api/EquipmentAPI';
// import type { EquipmentServiceLogInputPayload } from '../../api/EquipmentAPI';
import type { EmployeeInputPayload } from '../../api/EmployeeAPI';
import type { RoleInputPayload } from '../../api/EmployeeAPI';
import type { IncidentInputPayload } from '../../api/IncidentAPI';
// import type { IncidentEquipmentUsageLogInputPayload } from '../../api/IncidentEquipmentUsageAPI';
import type { MountainInputPayload } from '../../api/MountainAPI';
import type { AreaInputPayload } from '../../api/AreaAPI';
import type { AidRoomInputPayload } from '../../api/AidRoomAPI';
// import type { AidRoomCheckInputPayload } from '../../api/AidRoomAPI';
import type { HutInputPayload } from '../../api/HutAPI';
// import type { HutCheckInputPayload } from '../../api/HutAPI';
import type { LodgeInputPayload } from '../../api/LodgeAPI';
import type { LiftInputPayload } from '../../api/LiftAPI';
import type { LiftCheckInputPayload } from '../../api/LiftAPI';
import type { TrailInputPayload } from '../../api/TrailAPI';
import type { TrailCheckInputPayload } from '../../api/TrailAPI';
import { stat } from 'fs';

export function equipmentRowToInputPayload(row: EquipmentRow): EquipmentInputPayload {
	return {
		name: row.name,
		type: row.type,
		number: row.number === 0 ? 0 : Number(row.number),
		description: row.description || '',
		status: row.status as EQUIPMENT_STATUS,
		picture: row.picture ?? undefined,
		cost: row.cost === 0 ? 0 : Number(row.cost),
		mountainId: row.mountainId ?? undefined,
		locationId: row.locationId || null,
		dateAdded: row.dateAdded ? new Date(row.dateAdded) : new Date(),
		areaId: row.areaId || undefined,
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
	};
}

// export function equipmentCheckRowToInputPayload(row: EquipmentCheckRow): EquipmentCheckInputPayload {
// 	return {
// 		employeeId: row.employeeId,
// 		mountainId: row.mountainId,
// 		equipmentId: row.equipmentId,
// 		notes: row.notes || '',
// 	};
// }

// export function equipmentServiceLogRowToInputPayload(row: EquipmentServiceLogRow): EquipmentServiceLogInputPayload {
// 	return {
// 		mountainId: row.mountainId,
// 		equipmentId: row.equipmentId,
// 		employeeId: row.employeeId || null,
// 		status: row.status as EQUIPMENT_STATUS,
// 		changedAt: row.changedAt ? new Date(row.changedAt) : new Date(),
// 		notes: row.notes || '',
// 	};
// }

export function roleRowToInputPayload(row: RoleRow): RoleInputPayload {
	return {
		department: row.department as DEPARTMENT,
		title: row.title,
		position: row.position,
		level: row.level as ROLE_LEVEL,
		permissions: Array.isArray(row.permissions)
			? row.permissions
			: row.permissions
			? (row.permissions as string).split(',')
			: [],
	};
}

export function employeeRowToInputPayload(row: EmployeeRow): EmployeeInputPayload {
	return {
		employeeIdNumber: row.employeeIdNumber ? Number(row.employeeIdNumber) : undefined,
		firstName: row.firstName,
		lastName: row.lastName,
		email: row.email,
		phoneNumber: row.phoneNumber || '',
		primaryDepartment: row.primaryDepartment as DEPARTMENT,
		status: row.status as EMPLOYEE_STATUS,
		roleId: row.roleId || null,
		mountainId: row.mountainId || null,
	};
}

export function incidentRowToInputPayload(row: IncidentRow): IncidentInputPayload {
	return {
		description: row.description,
		status: row.status as INCIDENT_STATUS,
		// employees: row.employees || [],
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
		locationId: row.locationId,
		mountainId: row.mountainId,
		callTime: row.callTime ? new Date(row.callTime).toISOString() : null,
		onSceneTime: row.onSceneTime ? new Date(row.onSceneTime).toISOString() : null,
		stableTime: row.stableTime ? new Date(row.stableTime).toISOString() : null,
		transportTime: row.transportTime ? new Date(row.transportTime).toISOString() : null,
		emptyRun: row.emptyRun ?? false,
		emptyRunAt: row.emptyRunAt ? new Date(row.emptyRunAt) : undefined,
	};
}

// export function incidentEquipmentUsageLogRowToInputPayload(
// 	row: IncidentEquipmentUsageLogRow
// ): IncidentEquipmentUsageLogInputPayload {
// 	return {
// 		usedAt: row.usedAt ? new Date(row.usedAt) : new Date(),
// 		notes: row.notes || '',
// 		mountainId: row.mountainId,
// 		equipmentId: row.equipmentId,
// 		incidentId: row.incidentId,
// 	};
// }

export function mountainRowToInputPayload(row: MountainRow): MountainInputPayload {
	return {
		name: row.name,
		city: row.city,
		state: row.state,
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
		height: row.height === null ? null : Number(row.height),
		phoneNumber: row.phoneNumber || '',
		address: row.address || '',
		zipcode: row.zipcode || '',
		openingDate: row.openingDate ? new Date(row.openingDate).toISOString() : undefined,
		closingDate: row.closingDate ? new Date(row.closingDate).toISOString() : undefined,
	};
}

export function areaRowToInputPayload(row: AreaRow): AreaInputPayload {
	return {
		name: row.name,
		type: row.type as AREA_TYPE,
		description: row.description || '',
	};
}

export function aidRoomRowToInputPayload(row: AidRoomRow): AidRoomInputPayload {
	return {
		name: row.name,
		status: row.status as STATUS,
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
		areaId: row.areaId ?? undefined,
	};
}

// export function aidRoomCheckRowToInputPayload(row: AidRoomCheckRow): AidRoomCheckInputPayload {
// 	return {
// 		employeeId: row.employeeId,
// 		mountainId: row.mountainId,
// 		aidRoomId: row.aidRoomId,
// 		notes: row.notes || '',
// 	};
// }

export function hutRowToInputPayload(row: HutRow): HutInputPayload {
	return {
		name: row.name,
		status: row.status as STATUS,
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
		areaId: row.areaId ?? undefined,
	};
}

// export function hutCheckRowToInputPayload(row: HutCheckRow): HutCheckInputPayload {
// 	return {
// 		employeeId: row.employeeId,
// 		mountainId: row.mountainId,
// 		hutId: row.hutId,
// 		notes: row.notes || '',
// 	};
// }

export function liftRowToInputPayload(row: LiftRow): LiftInputPayload {
	return {
		name: row.name,
		status: row.status as STATUS,
		type: row.type as LIFT_TYPE,
		capacity: Number(row.capacity) ?? 0,
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
		areaId: row.areaId ?? undefined,
	};
}

export function liftCheckRowToInputPayload(row: LiftCheckRow): LiftCheckInputPayload {
	return {
		employeeId: row.employeeId,
		notes: row.notes || '',
		hazards: typeof row.hazards === 'boolean' ? row.hazards : Boolean(row.hazards),
		status: row.status as STATUS,
	};
}

export function lodgeRowToInputPayload(row: LodgeRow): LodgeInputPayload {
	return {
		name: row.name,
		status: row.status as STATUS,
		capacity: Number(row.capacity) ?? 0,
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
		areaId: row.areaId ?? undefined,
	};
}

export function trailRowToInputPayload(row: TrailRow): TrailInputPayload {
	return {
		name: row.name,
		status: row.status as STATUS,
		difficulty: row.difficulty as TRAIL_DIFFICULTY,
		condition: row.condition as TRAIL_CONDITION,
		length: row.length === null ? 0 : Number(row.length),
		latitude: row.latitude === null ? null : Number(row.latitude),
		longitude: row.longitude === null ? null : Number(row.longitude),
		areaId: row.areaId ?? undefined,
	};
}

export function trailCheckRowToInputPayload(row: TrailCheckRow): TrailCheckInputPayload {
	return {
		employeeId: row.employeeId,
		condition: row.condition as TRAIL_CONDITION,
		status: row.status as STATUS,
		hazards: typeof row.hazards === 'boolean' ? row.hazards : Boolean(row.hazards),
		snowmaking: row.snowmaking ?? false,
		notes: row.notes || '',
	};
}

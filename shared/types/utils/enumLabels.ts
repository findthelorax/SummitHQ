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
} from '../enums';

export const LOCATION_TYPE_LABELS: Record<LOCATION_TYPE, string> = {
	[LOCATION_TYPE.AID_ROOM]: 'Aid Room',
	[LOCATION_TYPE.HUT]: 'Hut',
	[LOCATION_TYPE.LODGE]: 'Lodge',
	[LOCATION_TYPE.LIFT]: 'Lift',
	[LOCATION_TYPE.TRAIL]: 'Trail',
	[LOCATION_TYPE.MOUNTAIN]: 'Mountain',
	[LOCATION_TYPE.OTHER]: 'Other',
};

export const STATUS_LABELS: Record<STATUS, string> = {
	[STATUS.OPEN]: 'Open',
	[STATUS.CLOSED]: 'Closed',
	[STATUS.ON_HOLD]: 'On Hold',
	[STATUS.UNKNOWN]: 'Unknown',
};

export const INCIDENT_STATUS_LABELS: Record<INCIDENT_STATUS, string> = {
	[INCIDENT_STATUS.STANDBY]: 'Standby',
	[INCIDENT_STATUS.REPORTED]: 'Reported',
	[INCIDENT_STATUS.IN_PROGRESS]: 'In Progress',
	[INCIDENT_STATUS.RESOLVED]: 'Resolved',
	[INCIDENT_STATUS.UNKNOWN]: 'Unknown',
};

export const EQUIPMENT_STATUS_LABELS: Record<EQUIPMENT_STATUS, string> = {
	[EQUIPMENT_STATUS.OPERATIONAL]: 'Operational',
	[EQUIPMENT_STATUS.IN_SERVICE]: 'In Service',
	[EQUIPMENT_STATUS.OUT_OF_SERVICE]: 'Out of Service',
	[EQUIPMENT_STATUS.IN_USE]: 'In Use',
	[EQUIPMENT_STATUS.CLEANING]: 'Cleaning',
	[EQUIPMENT_STATUS.NEEDS_INSPECTION]: 'Needs Inspection',
	[EQUIPMENT_STATUS.PENDING_REPAIR]: 'Pending Repair',
	[EQUIPMENT_STATUS.UNDER_MAINTENANCE]: 'Under Maintenance',
	[EQUIPMENT_STATUS.LOST]: 'Lost',
	[EQUIPMENT_STATUS.DAMAGED]: 'Damaged',
	[EQUIPMENT_STATUS.RETIRED]: 'Retired',
	[EQUIPMENT_STATUS.STANDBY]: 'Standby',
};

export const LIFT_TYPE_LABELS: Record<LIFT_TYPE, string> = {
	[LIFT_TYPE.CHAIR]: 'Chair',
	[LIFT_TYPE.GONDOLA]: 'Gondola',
	[LIFT_TYPE.T_BAR]: 'T-Bar',
	[LIFT_TYPE.ROPE_TOW]: 'Rope Tow',
	[LIFT_TYPE.MAGIC_CARPET]: 'Magic Carpet',
	[LIFT_TYPE.OTHER]: 'Other',
};

export const TRAIL_CONDITION_LABELS: Record<TRAIL_CONDITION, string> = {
	[TRAIL_CONDITION.MACHINE_GROOMED]: 'Machine Groomed',
	[TRAIL_CONDITION.HARD_PACK]: 'Hard Pack',
	[TRAIL_CONDITION.PACKED_POWDER]: 'Packed Powder',
	[TRAIL_CONDITION.POWDER]: 'Powder',
	[TRAIL_CONDITION.MOGULS]: 'Moguls',
	[TRAIL_CONDITION.NATURAL]: 'Natural',
	[TRAIL_CONDITION.GLADES]: 'Glades',
	[TRAIL_CONDITION.CLOSED]: 'Closed',
};

export const TRAIL_DIFFICULTY_LABELS: Record<TRAIL_DIFFICULTY, string> = {
	[TRAIL_DIFFICULTY.GREEN_CIRCLE]: 'Green Circle',
	[TRAIL_DIFFICULTY.BLUE_SQUARE]: 'Blue Square',
	[TRAIL_DIFFICULTY.BLACK_DIAMOND]: 'Black Diamond',
	[TRAIL_DIFFICULTY.DOUBLE_BLACK_DIAMOND]: 'Double Black Diamond',
	[TRAIL_DIFFICULTY.TERRAIN_PARK]: 'Terrain Park',
	[TRAIL_DIFFICULTY.RACE_COURSE]: 'Race Course',
	[TRAIL_DIFFICULTY.OTHER]: 'Other',
};

export const DEPARTMENT_LABELS: Record<DEPARTMENT, string> = {
	[DEPARTMENT.PATROL]: 'Patrol',
	[DEPARTMENT.LIFT_OPERATIONS]: 'Lift Operations',
	[DEPARTMENT.DISPATCH]: 'Dispatch',
	[DEPARTMENT.MAINTENANCE]: 'Maintenance',
	[DEPARTMENT.ADMINISTRATION]: 'Administration',
	[DEPARTMENT.OTHER]: 'Other',
};

export const AREA_TYPE_LABELS: Record<AREA_TYPE, string> = {
	[AREA_TYPE.BASE_AREA]: 'Base Area',
	[AREA_TYPE.MOUNTAIN_AREA]: 'Mountain Area',
	[AREA_TYPE.SUMMIT]: 'Summit',
	[AREA_TYPE.OTHER]: 'Other',
};

export const EMPLOYEE_STATUS_LABELS: Record<EMPLOYEE_STATUS, string> = {
    [EMPLOYEE_STATUS.ACTIVE]: 'Active',
    [EMPLOYEE_STATUS.INACTIVE]: 'Inactive',
    [EMPLOYEE_STATUS.ON_LEAVE]: 'On Leave',
    [EMPLOYEE_STATUS.TERMINATED]: 'Terminated',
};

export const ROLE_LEVEL_LABELS: Record<ROLE_LEVEL, string> = {
    [ROLE_LEVEL.LEVEL_1]: 'Level 1',
    [ROLE_LEVEL.LEVEL_2]: 'Level 2',
    [ROLE_LEVEL.LEVEL_3]: 'Level 3',
    [ROLE_LEVEL.LEVEL_4]: 'Level 4',
    [ROLE_LEVEL.LEVEL_5]: 'Level 5',
    [ROLE_LEVEL.LEVEL_6]: 'Level 6',
    [ROLE_LEVEL.LEVEL_7]: 'Level 7',
    [ROLE_LEVEL.LEVEL_8]: 'Level 8',
    [ROLE_LEVEL.LEVEL_9]: 'Level 9',
    [ROLE_LEVEL.LEVEL_10]: 'Level 10',
};

// Generic fallback formatter
export function defaultEnumLabel(value: string) {
	return value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, ' ');
}

// Generic helper to get label for any enum value
export function getEnumLabel<T extends string>(value: T, labelMap: Record<T, string>): string {
	return labelMap[value] ?? defaultEnumLabel(value);
}

// Helper to generate options for selects
export function enumToOptions<T extends string>(enumObj: Record<string, T>, labelMap: Record<T, string>) {
	return Object.values(enumObj).map((value) => ({
		value,
		label: getEnumLabel(value, labelMap),
	}));
}

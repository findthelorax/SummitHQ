import {
	Status,
	TrailCondition,
	TrailDifficulty,
	EquipmentStatus,
	Department,
	LocationType,
} from '../types';

/**
 * Converts an enum into an array of value/label pairs.
 * Label is humanized from the enum string (e.g., GREEN_CIRCLE => Green Circle)
 */
export const enumToSelectOptions = <T extends object>(enumObj: T) => {
	return Object.entries(enumObj).map(([_, value]) => ({
		value,
		label: value
			.toString()
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (char: string) => char.toUpperCase()),
	}));
};

// Predefined options for each enum
export const statusOptions = enumToSelectOptions(Status);
export const trailConditionOptions = enumToSelectOptions(TrailCondition);
export const trailDifficultyOptions = enumToSelectOptions(TrailDifficulty);
export const equipmentStatusOptions = enumToSelectOptions(EquipmentStatus);
export const departmentOptions = enumToSelectOptions(Department);
export const locationTypeOptions = enumToSelectOptions(LocationType);

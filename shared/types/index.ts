import type { Area, Trail, Lift, Hut, AidRoom, Lodge, Equipment, Location } from '../../server/src/generated/prisma';
import type { Employee as PrismaEmployee, Role as PrismaRole } from '../../server/src/generated/prisma';

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

// Employee with role (for department filtering)
export type EmployeeWithRole = PrismaEmployee & {
    role?: PrismaRole | null;
};

// Area with all related entities eagerly loaded
export type AreaWithEntities = Area & {
	trails: Trail[];
	lifts: Lift[];
	huts: Hut[];
	aidrooms: AidRoom[];
	lodges: Lodge[];
};

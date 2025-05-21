// Export all types from Prisma (models, etc)
export * from '../../server/src/generated/prisma';

// Explicitly re-export enums from your shared enums file
export {
	AREA_TYPE,
	DEPARTMENT,
	EMPLOYEE_ROLES,
	EQUIPMENT_STATUS,
	INCIDENT_STATUS,
	LIFT_TYPE,
	LOCATION_TYPE,
	STATUS,
	TRAIL_CONDITION,
	TRAIL_DIFFICULTY,
} from '../types/enums';

import type { Area, Trail, Lift, Hut, AidRoom, Lodge } from '../../server/src/generated/prisma';

export type AreaWithEntities = Area & {
	trails: Trail[];
	lifts: Lift[];
	huts: Hut[];
	aidrooms: AidRoom[];
	lodges: Lodge[];
};
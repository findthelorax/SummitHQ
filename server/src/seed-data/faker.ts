import { faker } from '@faker-js/faker';
import {
	STATUS,
	TRAIL_DIFFICULTY,
	TRAIL_CONDITION,
	LIFT_TYPE,
	EQUIPMENT_STATUS,
	DEPARTMENT,
	EMPLOYEE_STATUS,
	AREA_TYPE,
	ROLE_LEVEL,
} from '../../../client/src/types/generated-enums.js';
import type { Prisma } from '../generated/prisma/index.js';

// --- Constants ---
const EQUIPMENT_TYPES = [
	'AED',
	'Trauma Bag',
	'Toboggan',
	'Scoop Stretcher',
	'Backboard',
	'Oxygen Kit',
	'Splint Kit',
	'Rescue Sled',
	'Vacuum Mattress',
	'Cervical Collar',
	'First Aid Kit',
	'Defibrillator',
	'Rescue Rope',
	'Trauma Shears',
	'Patient Monitor',
] as const;

const AREA_TYPES: AREA_TYPE[] = [AREA_TYPE.BASE_AREA, AREA_TYPE.MOUNTAIN_AREA, AREA_TYPE.SUMMIT, AREA_TYPE.OTHER];
const AREA_NAMES = ['Southside', 'Northside', 'Base Area', 'Summit', 'Eastside', 'Westside'];
const AREAS_PER_MOUNTAIN = 4;

// --- Helpers ---
function formatUSPhone(raw: string): string {
	const digits = raw.replace(/\D/g, '').replace(/^1/, '');
	return digits.length === 10 ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}` : raw;
}

function randomEnum<T extends object>(e: T): T[keyof T] {
	return faker.helpers.arrayElement(Object.values(e));
}

// --- Types ---
type Role = {
	id: string;
	department: DEPARTMENT;
	title: string;
	position: string;
	level: ROLE_LEVEL;
	permissions: string[];
};

// --- Generators ---

export const generateEquipment = (mountainId?: string, number?: number, forMany = false): any => ({
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement(EQUIPMENT_TYPES),
    status: randomEnum(EQUIPMENT_STATUS),
    number: number ?? faker.number.int({ min: 1, max: 10000 }),
    description: faker.lorem.sentence(),
    picture: faker.image.url(),
    cost: parseFloat((Math.random() * 1000).toFixed(2)),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    ...(forMany && mountainId ? { mountainId } : mountainId ? { mountain: { connect: { id: mountainId } } } : {}),
});

export const generateEmployee = (roles: Role[] = [], mountainId?: string, forMany = false): any => {
    const hasExtension = Math.random() < 0.2;
    const basePhone = formatUSPhone(faker.phone.number({ style: 'national' }));
    const phone = basePhone + (hasExtension ? ` x${faker.number.int({ min: 100, max: 9999 })}` : '');

    const primaryDepartment = randomEnum(DEPARTMENT);

    let roleId: string | undefined = undefined;
    if (roles.length > 0) {
        const deptRoles = roles.filter((r) => r.department === primaryDepartment);
        if (deptRoles.length > 0) {
            roleId = faker.helpers.arrayElement(deptRoles).id;
        }
    }

    const base = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        phoneNumber: phone,
        status: randomEnum(EMPLOYEE_STATUS),
        primaryDepartment,
        startDate: faker.date.past(),
        endDate: faker.date.future(),
    };

    if (forMany) {
        return { ...base, roleId };
    } else {
        return { ...base, role: roleId ? { connect: { id: roleId } } : undefined };
    }
};

export const generateEmployeeAssignment = (
	employeeId: string,
	mountainId: string
): Prisma.EmployeeMountainAssignmentCreateInput => ({
	employee: { connect: { id: employeeId } },
	mountain: { connect: { id: mountainId } },
	startDate: faker.date.past(),
	endDate: faker.date.future(),
});

export const generateMountain = (): Prisma.MountainCreateInput => ({
	name: `${faker.location.city()} Mountain`,
	latitude: faker.location.latitude(),
	longitude: faker.location.longitude(),
	height: faker.number.int({ min: 1000, max: 4000 }),
	phoneNumber: formatUSPhone(faker.phone.number({ style: 'national' })),
	address: faker.location.streetAddress(),
	city: faker.location.city(),
	state: faker.location.state(),
	zipcode: faker.location.zipCode(),
	openingDate: faker.date.past(),
	closingDate: faker.date.future(),
});

export function generateAreasForMountain(mountainId: string): Omit<Prisma.AreaCreateManyInput, 'id'>[] {
    return Array.from({ length: AREAS_PER_MOUNTAIN }, (_, i) => ({
        name: AREA_NAMES[i % AREA_NAMES.length],
        type: AREA_TYPES[i % AREA_TYPES.length],
        mountainId,
        description: `${AREA_NAMES[i % AREA_NAMES.length]} of mountain`,
    }));
}

export const generateAidRoom = (mountainId: string, forMany = false): any => ({
    ...(forMany ? { mountainId } : { mountain: { connect: { id: mountainId } } }),
    name: `${faker.company.name()} Aid Room`,
    status: randomEnum(STATUS),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
});

export const generateHut = (mountainId: string, forMany = false): any => ({
    ...(forMany ? { mountainId } : { mountain: { connect: { id: mountainId } } }),
    name: `${faker.company.name()} Hut`,
    status: randomEnum(STATUS),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
});

export const generateLift = (mountainId: string, forMany = false): any => ({
    ...(forMany ? { mountainId } : { mountain: { connect: { id: mountainId } } }),
    name: `${faker.word.words()} Lift`,
    type: randomEnum(LIFT_TYPE),
    status: randomEnum(STATUS),
    capacity: faker.number.int({ min: 1, max: 100 }),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
});

export const generateLodge = (mountainId: string, forMany = false): any => ({
    ...(forMany ? { mountainId } : { mountain: { connect: { id: mountainId } } }),
    name: `${faker.company.name()} Lodge`,
    capacity: faker.number.int({ min: 50, max: 150 }),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    status: randomEnum(STATUS),
});

export const generateTrail = (mountainId: string, forMany = false): any => ({
    ...(forMany ? { mountainId } : { mountain: { connect: { id: mountainId } } }),
    name: `${faker.word.words()} Trail`,
    difficulty: randomEnum(TRAIL_DIFFICULTY),
    status: randomEnum(STATUS),
    length: parseFloat((Math.random() * 10).toFixed(2)),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    condition: randomEnum(TRAIL_CONDITION),
});

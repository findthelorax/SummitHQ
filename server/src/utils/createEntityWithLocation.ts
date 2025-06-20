import { prisma } from '../config/database.js';
import { LOCATION_TYPE } from '../generated/prisma/index.js';

export async function createEntityWithLocation(entityType: string, mountainId: string, data: any, areaId?: string) {
	if (!mountainId) {
		throw new Error(`mountainId is required when creating a ${entityType}`);
	}

	const mountainExists = await prisma.mountain.findUnique({
		where: { id: mountainId },
	});

	if (!mountainExists) {
		throw new Error(`Mountain with ID ${mountainId} does not exist.`);
	}

	const sanitizedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
	const { locationId, mountain, areaId: _areaId, mountainId: _mountainId, ...rest } = sanitizedData;

	const entityData: any = {
		...rest,
		mountain: { connect: { id: mountainId } },
	};

	const entityDelegateMap: Record<string, keyof typeof prisma> = {
		trail: 'trail',
		lift: 'lift',
		lodge: 'lodge',
		hut: 'hut',
		aidRoom: 'aidRoom',
	};

	if (!(entityType in entityDelegateMap)) {
		throw new Error(`Unsupported entityType: ${entityType}`);
	}

	return await prisma.$transaction(async (tx) => {
		const delegate = (tx as any)[entityDelegateMap[entityType]];
		const entity = await delegate.create({
			data: entityData,
		});

		// Safely map string to enum value
		const locationType = LOCATION_TYPE[entityType.toUpperCase() as keyof typeof LOCATION_TYPE];
		if (!locationType) {
			throw new Error(`Invalid entityType: ${entityType}`);
		}

		const location = await tx.location.create({
			data: {
				mountainId,
				name: data.name,
				entityId: entity.id,
				entityType: locationType,
				areaId: areaId || undefined,
			},
		});

		await delegate.update({
			where: { id: entity.id },
			data: { locationId: location.id },
		});

		return { ...entity, locationId: location.id };
	});
}

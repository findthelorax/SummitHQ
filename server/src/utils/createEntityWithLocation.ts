import { PrismaClient } from '@prisma/client';

export async function createEntityWithLocation(
    prisma: PrismaClient,
    entityType: string,
    mountainId: string,
    data: any
) {
    if (!mountainId) {
        throw new Error(`mountainId is required when creating a ${entityType}`);
    }

    const mountainExists = await prisma.mountain.findUnique({
        where: { id: mountainId },
    });

    if (!mountainExists) {
        throw new Error(`Mountain with ID ${mountainId} does not exist.`);
    }

    // Remove all undefined fields
    const sanitizedData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
    const { locationId, mountain, ...rest } = sanitizedData;

    const entityData: any = {
        ...rest,
        mountain: { connect: { id: mountainId } },
    };

    return await prisma.$transaction(async (prisma: PrismaClient) => {
        // 1. Create the entity (e.g., Lift) WITHOUT locationId or mountain
        const entity = await prisma[entityType].create({
            data: entityData,
        });

        // 2. Create the Location
        const location = await prisma.location.create({
            data: {
                mountainId,
                name: data.name,
                entityId: entity.id,
                entityType: entityType.toUpperCase(),
            },
        });

        // 3. Update the entity with the new locationId
        await prisma[entityType].update({
            where: { id: entity.id },
            data: { locationId: location.id },
        });

        return { ...entity, locationId: location.id };
    });
}
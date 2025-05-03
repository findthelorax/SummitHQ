import { PrismaClient } from '@prisma/client';

export async function createEntityWithLocation(
    prisma: PrismaClient,
    entityType: string,
    mountainId: string | undefined, // Allow undefined for Mountain creation
    data: any
) {
    if (mountainId) {
        const mountainExists = await prisma.mountain.findUnique({
            where: { id: mountainId },
        });

        if (!mountainExists) {
            throw new Error(`Mountain with ID ${mountainId} does not exist.`);
        }
    }

    return await prisma.$transaction(async (prisma: PrismaClient) => {
        const entity = await prisma[entityType].create({
            data: {
                ...data,
                mountainId: mountainId || undefined, // Allow undefined for Mountain creation
            },
        });

        // Create the associated location
        await prisma.location.create({
            data: {
                mountainId: mountainId || entity.id, // Use entity.id for Mountain creation
                name: data.name,
                entityId: entity.id,
                entityType: entityType.charAt(0).toUpperCase() + entityType.slice(1), // Capitalize entityType
            },
        });

        return entity;
    });
}
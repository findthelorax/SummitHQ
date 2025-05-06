import { PrismaClient } from '@prisma/client';

export async function createEntityWithLocation(
    prisma: PrismaClient,
    entityType: string,
    mountainID: string | undefined, // Allow undefined for Mountain creation
    data: any
) {
    if (mountainID) {
        const mountainExists = await prisma.mountain.findUnique({
            where: { id: mountainID },
        });

        if (!mountainExists) {
            throw new Error(`Mountain with ID ${mountainID} does not exist.`);
        }
    }

    return await prisma.$transaction(async (prisma: PrismaClient) => {
        const entity = await prisma[entityType].create({
            data: {
                ...data,
                mountainID: mountainID || undefined, // Allow undefined for Mountain creation
            },
        });

        // Create the associated location
        await prisma.location.create({
            data: {
                mountainID: mountainID || entity.id, // Use entity.id for Mountain creation
                name: data.name,
                entityID: entity.id,
                entityType: entityType.charAt(0).toUpperCase() + entityType.slice(1), // Capitalize entityType
            },
        });

        return entity;
    });
}
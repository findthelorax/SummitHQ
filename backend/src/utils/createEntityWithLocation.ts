import { PrismaClient } from '@prisma/client';

export async function createEntityWithLocation(
    prisma: PrismaClient,
    entityType: string,
    mountainId: string,
    data: any
) {
    return await prisma.$transaction(async (prisma: PrismaClient) => {
        const entity = await prisma[entityType].create({
            data: {
                ...data,
                mountainId,
            },
        });

        await prisma.location.create({
            data: {
                mountainId,
                type: entityType.charAt(0).toUpperCase() + entityType.slice(1),
                name: data.name,
                [`${entityType}Id`]: entity.id,
            },
        });

        return entity;
    });
}
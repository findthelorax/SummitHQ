import { PrismaClient } from '@prisma/client';

export async function createEntityWithLocation(
    prisma: PrismaClient,
    entityType: string,
    mountainId: string | undefined,
    data: any
) {
    const isCreatingMountain = entityType === 'mountain';

    if (!isCreatingMountain) {
        if (!mountainId) {
            throw new Error(`mountainId is required when creating a ${entityType}`);
        }

        const mountainExists = await prisma.mountain.findUnique({
            where: { id: mountainId },
        });

        if (!mountainExists) {
            throw new Error(`Mountain with ID ${mountainId} does not exist.`);
        }
    }

    return await prisma.$transaction(async (prisma: PrismaClient) => {
        const entityData: any = {
            ...data,
        };

        if (!isCreatingMountain && mountainId) {
            entityData.mountainId = mountainId;
        }

        const entity = await prisma[entityType].create({
            data: entityData,
        });

        if (!isCreatingMountain) {
            const existingLocation = await prisma.location.findFirst({
                where: {
                    entityId: entity.id,
                    entityType: entityType.charAt(0).toUpperCase() + entityType.slice(1),
                },
            });

            if (!existingLocation) {
                await prisma.location.create({
                    data: {
                        mountainId,
                        name: data.name,
                        entityId: entity.id,
                        entityType: entityType.charAt(0).toUpperCase() + entityType.slice(1),
                    },
                });
            }
        }

        return entity;
    });
}
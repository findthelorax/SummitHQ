import { prisma } from '../config/database.js';
import { LOCATION_TYPE } from '../generated/prisma/index.js';

export async function updateEntityLocationArea(
    entityType: string,
    mountainId: string,
    entityId: string,
    areaId?: string
) {
    if (!mountainId) {
        throw new Error(`mountainId is required when updating a ${entityType} location`);
    }

    const mountainExists = await prisma.mountain.findUnique({
        where: { id: mountainId },
    });
    if (!mountainExists) {
        throw new Error(`Mountain with ID ${mountainId} does not exist.`);
    }

    const location = await prisma.location.findFirst({
        where: {
            entityId,
            entityType: entityType.toUpperCase() as LOCATION_TYPE,
            mountainId,
        },
    });
    if (!location) {
        throw new Error(
            `Location for ${entityType} with ID ${entityId} on mountain ${mountainId} does not exist.`
        );
    }

    return await prisma.location.update({
        where: { id: location.id },
        data: { areaId: areaId || null },
    });
}
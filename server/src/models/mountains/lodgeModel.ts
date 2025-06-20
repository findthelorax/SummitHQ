import { prisma } from '../../config/database.js';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation.js';
import { updateEntityLocationArea } from '../../utils/updateEntityWithLocation.js';
import { capitalizeWords } from '../../utils/capitalizeWords.js';
import { locationWithAreaInclude } from '../../utils/prismaIncludes.js';

class LodgeModel {
    static async create(mountainId: string, data: any, areaId?: string) {
        const mountainExists = await prisma.mountain.findUnique({
            where: { id: mountainId },
        });
        if (!mountainExists) {
            throw new Error(`Mountain with ID ${mountainId} does not exist.`);
        }
        if (data.name) {
            data.name = capitalizeWords(data.name);
        }
        return await createEntityWithLocation('lodge', mountainId, data, areaId);
    }

    static async findByIdAndMountain(lodgeId: string, mountainId: string) {
        return await prisma.lodge.findFirst({
            where: {
                id: lodgeId,
                mountainId,
            },
            include: locationWithAreaInclude,
        });
    }

    static async findAll() {
        return await prisma.lodge.findMany({
            include: locationWithAreaInclude,
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.lodge.findMany({
            where: { mountainId },
            include: locationWithAreaInclude,
        });
    }

    static async updateById(lodgeId: string, updatedData: any) {
        const { areaId, ...lodgeUpdate } = updatedData;

        if (lodgeUpdate.name) {
            lodgeUpdate.name = capitalizeWords(lodgeUpdate.name);
        }

        const updatedLodge = await prisma.lodge.update({
            where: { id: lodgeId },
            data: lodgeUpdate,
            include: locationWithAreaInclude,
        });

        if (areaId !== undefined) {
            await updateEntityLocationArea('lodge', updatedLodge.mountainId, lodgeId, areaId);
        }

        return updatedLodge;
    }

    static async deleteById(lodgeId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedLodge = await prisma.lodge.delete({
                where: {
                    id: lodgeId,
                },
            });

            await prisma.location.delete({
                where: {
                    entityId: lodgeId,
                    entityType: 'LODGE',
                },
            });

            return deletedLodge;
        });
    }
}

export default LodgeModel;
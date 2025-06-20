import { prisma } from '../../config/database.js';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation.js';
import { updateEntityLocationArea } from '../../utils/updateEntityWithLocation.js';
import { capitalizeWords } from '../../utils/capitalizeWords.js';
import { locationWithAreaInclude } from '../../utils/prismaIncludes.js';

class HutModel {
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
        return await createEntityWithLocation('hut', mountainId, data, areaId);
    }

    static async findByIdAndMountain(hutId: string, mountainId: string) {
        return await prisma.hut.findFirst({
            where: {
                id: hutId,
                mountainId,
            },
            include: locationWithAreaInclude,
        });
    }

    static async findAll() {
        return await prisma.hut.findMany({
            include: locationWithAreaInclude,
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.hut.findMany({
            where: { mountainId },
            include: locationWithAreaInclude,
        });
    }

    static async updateById(hutId: string, updatedData: any) {
        const { areaId, ...hutUpdate } = updatedData;

        if (hutUpdate.name) {
            hutUpdate.name = capitalizeWords(hutUpdate.name);
        }

        const updatedHut = await prisma.hut.update({
            where: { id: hutId },
            data: hutUpdate,
            include: locationWithAreaInclude,
        });

        if (areaId !== undefined) {
            await updateEntityLocationArea('hut', updatedHut.mountainId, hutId, areaId);
        }

        return updatedHut;
    }

    static async deleteById(hutId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedHut = await prisma.hut.delete({
                where: {
                    id: hutId,
                },
            });

            await prisma.location.delete({
                where: {
                    entityId: hutId,
                    entityType: 'HUT',
                },
            });

            return deletedHut;
        });
    }
}

export default HutModel;
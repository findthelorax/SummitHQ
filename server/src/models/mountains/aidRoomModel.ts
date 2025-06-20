import { prisma } from '../../config/database.js';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation.js';
import { updateEntityLocationArea } from '../../utils/updateEntityWithLocation.js';
import { capitalizeWords } from '../../utils/capitalizeWords.js';
import { locationWithAreaInclude } from '../../utils/prismaIncludes.js';

class AidRoomModel {
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
        return await createEntityWithLocation('aidRoom', mountainId, data, areaId);
    }

    static async findByIdAndMountain(aidRoomId: string, mountainId: string) {
        return await prisma.aidRoom.findFirst({
            where: {
                id: aidRoomId,
                mountainId,
            },
            include: locationWithAreaInclude,
        });
    }

    static async findAll() {
        return await prisma.aidRoom.findMany({
            include: locationWithAreaInclude,
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.aidRoom.findMany({
            where: { mountainId },
            include: locationWithAreaInclude,
        });
    }

    static async updateById(aidRoomId: string, updatedData: any) {
        const { areaId, ...aidRoomUpdate } = updatedData;

        if (aidRoomUpdate.name) {
            aidRoomUpdate.name = capitalizeWords(aidRoomUpdate.name);
        }

        const updatedAidRoom = await prisma.aidRoom.update({
            where: { id: aidRoomId },
            data: aidRoomUpdate,
            include: locationWithAreaInclude,
        });

        if (areaId !== undefined) {
            await updateEntityLocationArea('aidRoom', updatedAidRoom.mountainId, aidRoomId, areaId);
        }

        return updatedAidRoom;
    }

    static async deleteById(aidRoomId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedAidRoom = await prisma.aidRoom.delete({
                where: {
                    id: aidRoomId,
                },
            });

            await prisma.location.delete({
                where: {
                    entityId: aidRoomId,
                    entityType: 'AIDROOM',
                },
            });

            return deletedAidRoom;
        });
    }
}

export default AidRoomModel;
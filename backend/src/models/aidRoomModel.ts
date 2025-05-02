import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class AidRoom {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'aidRoom', mountainId, data);
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.aidRoom.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.aidRoom.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.aidRoom.update({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.aidRoom.delete({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default AidRoom;
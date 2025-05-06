import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class AidRoom {
    static async create(mountainID: string, data: any) {
        return await createEntityWithLocation(prisma, 'aidRoom', mountainID, data);
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.aidRoom.findFirst({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.aidRoom.findMany({
            where: { mountainID },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.aidRoom.update({
            where: {
                id,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.aidRoom.delete({
            where: {
                id,
                mountainID,
            },
        });
    }
}

export default AidRoom;
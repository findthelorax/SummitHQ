import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class HutModel {
    static async create(mountainID: string, data: any) {
        return await createEntityWithLocation(prisma, 'hut', mountainID, data);
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.hut.findFirst({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.hut.findMany({
            where: { mountainID },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.hut.update({
            where: {
                id,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.hut.delete({
            where: {
                id,
                mountainID,
            },
        });
    }
}

export default HutModel;
import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class HutModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'hut', mountainId, data);
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.hut.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.hut.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.hut.update({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.hut.delete({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default HutModel;
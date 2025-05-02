import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class LodgeModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'lodge', mountainId, data);
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.lodge.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.lodge.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.lodge.update({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.lodge.delete({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default LodgeModel;
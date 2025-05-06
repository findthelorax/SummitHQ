import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class LodgeModel {
    static async create(mountainID: string, data: any) {
        return await createEntityWithLocation(prisma, 'lodge', mountainID, data);
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.lodge.findFirst({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.lodge.findMany({
            where: { mountainID },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.lodge.update({
            where: {
                id,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.lodge.delete({
            where: {
                id,
                mountainID,
            },
        });
    }
}

export default LodgeModel;
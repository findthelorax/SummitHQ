import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class Trail {
    static async create(mountainID: string, data: any) {
        return await createEntityWithLocation(prisma, 'trail', mountainID, data);
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.trail.findFirst({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.trail.findMany({
            where: { mountainID },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.trail.update({
            where: {
                id,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.trail.delete({
            where: {
                id,
                mountainID,
            },
        });
    }
}

export default Trail;
import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class LiftModel {
    static async create(mountainID: string, data: any) {
        return await createEntityWithLocation(prisma, 'lift', mountainID, data);
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.lift.findFirst({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.lift.findMany({
            where: { mountainID },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.lift.update({
            where: {
                id,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.lift.delete({
            where: {
                id,
                mountainID,
            },
        });
    }
}

export default LiftModel;
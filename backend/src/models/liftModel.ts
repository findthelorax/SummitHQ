import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class LiftModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'lift', mountainId, data);
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.lift.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.lift.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.lift.update({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.lift.delete({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default LiftModel;
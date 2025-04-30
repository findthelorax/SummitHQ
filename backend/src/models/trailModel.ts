import { prisma } from '../config/database';

class Trail {
    static async create(mountainId: string, data: any) {
        if (!mountainId) {
            throw new Error("mountainId is required");
        }
        return await prisma.trail.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.trail.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.trail.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.trail.update({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.trail.delete({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default Trail;
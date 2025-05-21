import { prisma } from '../../config/database.js';

class TrailCheckModel {
    static async create(data: any) {
        return await prisma.trailCheck.create({ data });
    }

    static async findByIdAndMountainAndTrail(id: string, mountainId: string, trailId: string) {
        return await prisma.trailCheck.findFirst({
            where: {
                id,
                mountainId,
                trailId,
            },
        });
    }

    static async findAllByMountainAndTrail(mountainId: string, trailId: string) {
        return await prisma.trailCheck.findMany({
            where: {
                mountainId,
                trailId,
            },
        });
    }

    static async updateByIdAndMountainAndTrail(id: string, mountainId: string, trailId: string, updatedData: any) {
        return await prisma.trailCheck.updateMany({
            where: {
                id,
                mountainId,
                trailId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndTrail(id: string, mountainId: string, trailId: string) {
        return await prisma.trailCheck.deleteMany({
            where: {
                id,
                mountainId,
                trailId,
            },
        });
    }
}

export default TrailCheckModel;
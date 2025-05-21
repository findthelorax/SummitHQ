import { prisma } from '../../config/database.js';

class HutCheckModel {
    static async create(data: any) {
        return await prisma.hutCheck.create({ data });
    }

    static async findByIdAndMountainAndHut(id: string, mountainId: string, hutId: string) {
        return await prisma.hutCheck.findFirst({
            where: {
                id,
                mountainId,
                hutId,
            },
        });
    }

    static async findAllByMountainAndHut(mountainId: string, hutId: string) {
        return await prisma.hutCheck.findMany({
            where: {
                mountainId,
                hutId,
            },
        });
    }

    static async updateByIdAndMountainAndHut(id: string, mountainId: string, hutId: string, updatedData: any) {
        return await prisma.hutCheck.updateMany({
            where: {
                id,
                mountainId,
                hutId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndHut(id: string, mountainId: string, hutId: string) {
        return await prisma.hutCheck.deleteMany({
            where: {
                id,
                mountainId,
                hutId,
            },
        });
    }
}

export default HutCheckModel;
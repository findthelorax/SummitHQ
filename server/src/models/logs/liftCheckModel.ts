import { prisma } from '../../config/database.js';

class LiftCheckModel {
    static async create(data: any) {
        return await prisma.liftCheck.create({ data });
    }

    static async findByIdAndMountainAndLift(id: string, mountainId: string, liftId: string) {
        return await prisma.liftCheck.findFirst({
            where: {
                id,
                mountainId,
                liftId,
            },
        });
    }

    static async findAllByMountainAndLift(mountainId: string, liftId: string) {
        return await prisma.liftCheck.findMany({
            where: {
                mountainId,
                liftId,
            },
        });
    }

    static async updateByIdAndMountainAndLift(id: string, mountainId: string, liftId: string, updatedData: any) {
        return await prisma.liftCheck.updateMany({
            where: {
                id,
                mountainId,
                liftId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndLift(id: string, mountainId: string, liftId: string) {
        return await prisma.liftCheck.deleteMany({
            where: {
                id,
                mountainId,
                liftId,
            },
        });
    }
}

export default LiftCheckModel;
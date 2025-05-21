import { prisma } from '../../config/database.js';

class AidRoomCheckModel {
    static async create(data: any) {
        return await prisma.aidRoomCheck.create({ data });
    }

    static async findByIdAndMountainAndAidRoom(id: string, mountainId: string, aidRoomId: string) {
        return await prisma.aidRoomCheck.findFirst({
            where: {
                id,
                mountainId,
                aidRoomId,
            },
        });
    }

    static async findAllByMountainAndAidRoom(mountainId: string, aidRoomId: string) {
        return await prisma.aidRoomCheck.findMany({
            where: {
                mountainId,
                aidRoomId,
            },
        });
    }

    static async updateByIdAndMountainAndAidRoom(id: string, mountainId: string, aidRoomId: string, updatedData: any) {
        return await prisma.aidRoomCheck.updateMany({
            where: {
                id,
                mountainId,
                aidRoomId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndAidRoom(id: string, mountainId: string, aidRoomId: string) {
        return await prisma.aidRoomCheck.deleteMany({
            where: {
                id,
                mountainId,
                aidRoomId,
            },
        });
    }
}

export default AidRoomCheckModel;
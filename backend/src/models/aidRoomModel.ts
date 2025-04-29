import { prisma } from '../config/database';

class AidRoom {
    static async create(mountainId: string, data: any) {
        return await prisma.aidRoom.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.aidRoom.findUnique({
            where: { id },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.aidRoom.findMany({
            where: { mountainId },
        });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.aidRoom.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.aidRoom.delete({
            where: { id },
        });
    }
}

export default AidRoom;
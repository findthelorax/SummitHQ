import { prisma } from '../../config/database';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation';

class AidRoomModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'aidRoom', mountainId, data);
    }

    static async findByIdAndMountain(aidRoomId: string, mountainId: string) {
        return await prisma.aidRoom.findFirst({
            where: {
                id: aidRoomId,
                mountainId,
            },
        });
    }

    static async findAll() {
        return await prisma.aidRoom.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.aidRoom.findMany({
            where: { mountainId },
        });
    }

    static async updateById(aidRoomId: string, updatedData: any) {
        return await prisma.aidRoom.update({
            where: {
                id: aidRoomId,
            },
            data: updatedData,
        });
    }

    static async deleteById(aidRoomId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedAidRoom = await prisma.aidRoom.delete({
                where: {
                    id: aidRoomId,
                },
            });

            await prisma.location.deleteMany({
                where: {
                    entityId: aidRoomId,
                    entityType: 'AidRoom',
                },
            });

            return deletedAidRoom;
        });
    }
}

export default AidRoomModel;
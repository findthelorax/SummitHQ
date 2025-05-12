import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class HutModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'hut', mountainId, data);
    }

    static async findByIdAndMountain(hutId: string, mountainId: string) {
        return await prisma.hut.findFirst({
            where: {
                id: hutId,
                mountainId,
            },
        });
    }

    static async findAll() {
        return await prisma.hut.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.hut.findMany({
            where: { mountainId },
        });
    }

    static async updateById(hutId: string, updatedData: any) {
        return await prisma.hut.update({
            where: {
                id: hutId,
            },
            data: updatedData,
        });
    }

    static async deleteById(hutId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedHut = await prisma.hut.delete({
                where: {
                    id: hutId,
                },
            });

            await prisma.location.deleteMany({
                where: {
                    entityId: hutId,
                    entityType: 'Hut',
                },
            });

            return deletedHut;
        });
    }
}

export default HutModel;
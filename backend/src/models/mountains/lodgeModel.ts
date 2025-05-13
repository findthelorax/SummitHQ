import { prisma } from '../../config/database';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation';

class LodgeModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'lodge', mountainId, data);
    }

    static async findByIdAndMountain(lodgeId: string, mountainId: string) {
        return await prisma.lodge.findFirst({
            where: {
                id: lodgeId,
                mountainId,
            },
        });
    }

    static async findAll() {
        return await prisma.lodge.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.lodge.findMany({
            where: { mountainId },
        });
    }

    static async updateById(lodgeId: string, updatedData: any) {
        return await prisma.lodge.update({
            where: {
                id: lodgeId,
            },
            data: updatedData,
        });
    }

    static async deleteById(lodgeId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedLodge = await prisma.lodge.delete({
                where: {
                    id: lodgeId,
                },
            });

            await prisma.location.deleteMany({
                where: {
                    entityId: lodgeId,
                    entityType: 'Lodge',
                },
            });

            return deletedLodge;
        });
    }
}

export default LodgeModel;
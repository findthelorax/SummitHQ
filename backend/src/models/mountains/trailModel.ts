import { prisma } from '../../config/database';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation';

class TrailModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'trail', mountainId, data);
    }

    static async findByIdAndMountain(trailId: string, mountainId: string) {
        return await prisma.trail.findFirst({
            where: {
                id: trailId,
                mountainId,
            },
        });
    }

    static async findAll() {
        return await prisma.trail.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.trail.findMany({
            where: { mountainId },
        });
    }

    static async updateById(trailId: string, updatedData: any) {
        return await prisma.trail.update({
            where: {
                id: trailId,
            },
            data: updatedData,
        });
    }

    static async deleteById(trailId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedTrail = await prisma.trail.delete({
                where: {
                    id: trailId,
                },
            });

            await prisma.location.deleteMany({
                where: {
                    entityId: trailId,
                    entityType: 'Trail',
                },
            });

            return deletedTrail;
        });
    }
}

export default TrailModel;
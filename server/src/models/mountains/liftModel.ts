import { prisma } from '../../config/database.js';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation.js';

class LiftModel {
    static async create(mountainId: string, data: any) {
        return await createEntityWithLocation(prisma, 'lift', mountainId, data);
    }

    static async findByIdAndMountain(liftId: string, mountainId: string) {
        return await prisma.lift.findFirst({
            where: {
                id: liftId,
                mountainId,
            },
        });
    }

    static async findAll() {
        return await prisma.lift.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.lift.findMany({
            where: { mountainId },
        });
    }

    static async updateById(liftId: string, updatedData: any) {
        return await prisma.lift.update({
            where: {
                id: liftId,
            },
            data: updatedData,
        });
    }

    static async deleteById(liftId: string) {
        return await prisma.$transaction(async (prisma) => {
            const deletedLift = await prisma.lift.delete({
                where: {
                    id: liftId,
                },
            });

            await prisma.location.deleteMany({
                where: {
                    entityId: liftId,
                    entityType: 'LIFT',
                },
            });

            return deletedLift;
        });
    }
}

export default LiftModel;
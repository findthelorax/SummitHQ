import { prisma } from '../config/database';

class LodgeModel {
    static async create(mountainId: string, data: any) {
        return await prisma.lodge.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.lodge.findUnique({ where: { id } });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.lodge.findMany({
            where: { mountainId },
        });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.lodge.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.lodge.delete({ where: { id } });
    }
}

export default LodgeModel;
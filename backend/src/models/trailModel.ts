import { prisma } from '../config/database';

class Trail {
    static async create(mountainId: string, data: any) {
        return await prisma.trail.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.trail.findUnique({
            where: { id },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.trail.findMany({
            where: { mountainId },
        });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.trail.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.trail.delete({
            where: { id },
        });
    }
}

export default Trail;
import { prisma } from '../config/database';

class Hut {
    static async create(mountainId: string, data: any) {
        return await prisma.hut.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.hut.findUnique({
            where: { id },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.hut.findMany({
            where: { mountainId },
        });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.hut.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.hut.delete({
            where: { id },
        });
    }
}

export default Hut;
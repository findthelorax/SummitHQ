import { prisma } from '../config/database';
import { Status } from '../types';

class Hut {
    static async create(
        mountainId: string,
        data: { name: string; status: Status }
    ) {
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

    static async update(id: string, updatedData: Partial<{ name: string; difficulty: string; length: number; status: Status }>) {
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
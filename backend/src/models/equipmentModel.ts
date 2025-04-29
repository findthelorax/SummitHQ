import { prisma } from '../config/database';

class Equipment {
    static async create(mountainId: string, data: any) {
        return await prisma.equipment.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.equipment.findUnique({
            where: { id },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.equipment.findMany({
            where: { mountainId },
        });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.equipment.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.equipment.delete({
            where: { id },
        });
    }
}

export default Equipment;
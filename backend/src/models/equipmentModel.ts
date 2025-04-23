import { prisma } from '../config/database';
import { EquipmentStatus, EquipmentService } from '../types';

class Equipment {
    static async create(
        mountainId: string,
        data: { name: string; type: string; status: EquipmentStatus; service: EquipmentService; mountainId: string }
    ) {
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

    static async update(id: string, updatedData: Partial<{ name: string; type: string; status: EquipmentStatus; service: EquipmentService; mountainId: string }>) {
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
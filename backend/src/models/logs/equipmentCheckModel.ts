import { prisma } from '../../config/database';

class EquipmentCheckModel {
    static async create(data: any) {
        return await prisma.equipmentCheck.create({ data });
    }

    static async findById(id: string) {
        return await prisma.equipmentCheck.findUnique({ where: { id } });
    }

    static async findAll() {
        return await prisma.equipmentCheck.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.equipmentCheck.findMany({ where: { mountainId } });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.equipmentCheck.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.equipmentCheck.delete({ where: { id } });
    }
}

export default EquipmentCheckModel;
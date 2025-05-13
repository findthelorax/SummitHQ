import { prisma } from '../../config/database';

class EquipmentServiceLogModel {
    static async create(data: any) {
        return await prisma.equipmentServiceLog.create({ data });
    }

    static async findById(id: string) {
        return await prisma.equipmentServiceLog.findUnique({ where: { id } });
    }

    static async findAll() {
        return await prisma.equipmentServiceLog.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.equipmentServiceLog.findMany({ where: { mountainId } });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.equipmentServiceLog.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.equipmentServiceLog.delete({ where: { id } });
    }
}

export default EquipmentServiceLogModel;
import { prisma } from '../../config/database.js';

class EquipmentServiceLogModel {
    static async create(data: any) {
        return await prisma.equipmentServiceLog.create({ data });
    }

    static async findByIdAndMountainAndEquipment(id: string, mountainId: string, equipmentId: string) {
        return await prisma.equipmentServiceLog.findFirst({
            where: {
                id,
                mountainId,
                equipmentId,
            },
        });
    }

    static async findAllByMountainAndEquipment(mountainId: string, equipmentId: string) {
        return await prisma.equipmentServiceLog.findMany({
            where: {
                mountainId,
                equipmentId,
            },
        });
    }

    static async updateByIdAndMountainAndEquipment(id: string, mountainId: string, equipmentId: string, updatedData: any) {
        return await prisma.equipmentServiceLog.updateMany({
            where: {
                id,
                mountainId,
                equipmentId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndEquipment(id: string, mountainId: string, equipmentId: string) {
        return await prisma.equipmentServiceLog.deleteMany({
            where: {
                id,
                mountainId,
                equipmentId,
            },
        });
    }
}

export default EquipmentServiceLogModel;
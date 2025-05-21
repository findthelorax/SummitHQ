import { prisma } from '../../config/database.js';

class EquipmentCheckModel {
    static async create(data: any) {
        return await prisma.equipmentCheck.create({ data });
    }

    static async findByIdAndMountainAndEquipment(id: string, mountainId: string, equipmentId: string) {
        return await prisma.equipmentCheck.findFirst({
            where: {
                id,
                mountainId,
                equipmentId,
            },
        });
    }

    static async findAllByMountainAndEquipment(mountainId: string, equipmentId: string) {
        return await prisma.equipmentCheck.findMany({
            where: {
                mountainId,
                equipmentId,
            },
        });
    }

    static async updateByIdAndMountainAndEquipment(id: string, mountainId: string, equipmentId: string, updatedData: any) {
        return await prisma.equipmentCheck.updateMany({
            where: {
                id,
                mountainId,
                equipmentId,
            },
            data: updatedData,
        });
    }

    static async deleteByIdAndMountainAndEquipment(id: string, mountainId: string, equipmentId: string) {
        return await prisma.equipmentCheck.deleteMany({
            where: {
                id,
                mountainId,
                equipmentId,
            },
        });
    }
}

export default EquipmentCheckModel;
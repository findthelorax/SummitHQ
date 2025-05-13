import { prisma } from '../../config/database';

class IncidentEquipmentUseageLogModel {
    static async create(data: any) {
        return await prisma.incidentEquipmentUseageLog.create({ data });
    }

    static async findById(id: string) {
        return await prisma.incidentEquipmentUseageLog.findUnique({ where: { id } });
    }

    static async findAll() {
        return await prisma.incidentEquipmentUseageLog.findMany();
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.incidentEquipmentUseageLog.findMany({ where: { mountainId } });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.incidentEquipmentUseageLog.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.incidentEquipmentUseageLog.delete({ where: { id } });
    }
}

export default IncidentEquipmentUseageLogModel;
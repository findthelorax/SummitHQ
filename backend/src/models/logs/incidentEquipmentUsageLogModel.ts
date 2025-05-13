import { prisma } from '../../config/database';

class IncidentEquipmentUsageLogModel {
    static async create(data: any) {
        return await prisma.incidentEquipmentUsageLog.create({ data });
    }

    static async findByIdAndMountainAndIncident(id: string, mountainId: string, incidentId: string) {
        return await prisma.incidentEquipmentUsageLog.findFirst({
            where: {
                id,
                mountainId,
                incidentId,
            },
        });
    }

    static async findAllByMountainAndIncident(mountainId: string, incidentId: string) {
        return await prisma.incidentEquipmentUsageLog.findMany({
            where: {
                mountainId,
                incidentId,
            },
        });
    }

    static async updateByIdAndMountainAndIncident(
        id: string,
        mountainId: string,
        incidentId: string,
        updatedData: any
    ) {
        return await prisma.incidentEquipmentUsageLog.updateMany({
            where: {
                id,
                mountainId,
                incidentId,
            },
            data: {
                ...updatedData,
            },
        });
    }

    static async deleteByIdAndMountainAndIncident(id: string, mountainId: string, incidentId: string) {
        return await prisma.incidentEquipmentUsageLog.deleteMany({
            where: {
                id,
                mountainId,
                incidentId,
            },
        });
    }
}

export default IncidentEquipmentUsageLogModel;
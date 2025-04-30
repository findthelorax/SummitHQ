import { prisma } from '../config/database';

class IncidentModel {
    static async create(mountainId: string, data: any) {
        return await prisma.incident.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.incident.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.incident.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.incident.update({
            where: {
                id_mountainId: {
                    id,
                    mountainId,
                },
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.incident.delete({
            where: {
                id_mountainId: {
                    id,
                    mountainId,
                },
            },
        });
    }
}

export default IncidentModel;
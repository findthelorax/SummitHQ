import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class IncidentModel {
    static async createIncident(mountainId: string, locationId: string, data: any) {
        return await prisma.$transaction(async (prisma) => {
            const incident = await prisma.incident.create({
                data: {
                    ...data,
                    mountainId,
                    locationId,
                },
            });
            return incident;
        });
    }

    static async assignEmployee(incidentId: string, employeeId: string) {
        return await prisma.incident.update({
            where: { id: incidentId },
            data: { employeeId },
        });
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.incident.findFirst({
            where: {
                id,
                mountainId,
            },
            include: {
                location: true,
                mountain: true,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.incident.findMany({
            where: { mountainId },
            include: {
                location: true,
            },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.incident.update({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.incident.delete({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default IncidentModel;
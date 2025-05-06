import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class IncidentModel {
    static async createIncident(mountainID: string, locationID: string, data: any) {
        return await prisma.$transaction(async (prisma) => {
            const incident = await prisma.incident.create({
                data: {
                    ...data,
                    mountainID,
                    locationID,
                },
            });
            return incident;
        });
    }

    static async assignEmployee(incidentID: string, employeeID: string) {
        return await prisma.incident.update({
            where: { id: incidentID },
            data: { employeeID },
        });
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.incident.findFirst({
            where: {
                id,
                mountainID,
            },
            include: {
                location: true,
                mountain: true,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.incident.findMany({
            where: { mountainID },
            include: {
                location: true,
            },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.incident.update({
            where: {
                id,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.incident.delete({
            where: {
                id,
                mountainID,
            },
        });
    }
}

export default IncidentModel;
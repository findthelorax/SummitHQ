import { prisma } from '../config/database';

class LocationModel {
    static async create(mountainId: string, data: any) {
        return await prisma.location.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.location.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.location.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.location.updateMany({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.location.deleteMany({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async getHours(locationId: string) {
        return await prisma.hours.findMany({
            where: { locationId },
        });
    }

    static async addHours(locationId: string, hoursData: any[]) {
        if (!locationId) {
            throw new Error('Location ID is required.');
        }
    
        const locationExists = await prisma.location.findUnique({
            where: { id: locationId },
        });
    
        if (!locationExists) {
            throw new Error(`Location with ID ${locationId} does not exist.`);
        }
    
        const createdHours = [];
        for (const hour of hoursData) {
            const createdHour = await prisma.hours.create({
                data: {
                    ...hour,
                    locationId,
                },
            });
            createdHours.push(createdHour);
        }
    
        return createdHours;
    }

    static async updateHour(locationId: string, hourId: string, hourData: any) {
        if (!locationId || !hourId) {
            throw new Error('Location ID and Hour ID are required.');
        }
    
        const existingHour = await prisma.hours.findFirst({
            where: {
                id: hourId,
                locationId,
            },
        });
    
        if (!existingHour) {
            throw new Error(`Hour with ID ${hourId} for Location ID ${locationId} not found.`);
        }
    
        return await prisma.hours.update({
            where: {
                id: hourId,
            },
            data: hourData,
        });
    }

    static async deleteHour(locationId: string, hourId: string) {
        return await prisma.hours.deleteMany({
            where: {
                id: hourId,
                locationId,
            },
        });
    }

    static async getIncidents(locationId: string) {
        return await prisma.incident.findMany({
            where: { locationId },
        });
    }

    static async addIncident(locationId: string, incidentData: any) {
        return await prisma.incident.create({
            data: {
                ...incidentData,
                locationId,
            },
        });
    }

    static async updateIncident(locationId: string, incidentId: string, incidentData: any) {
        return await prisma.incident.updateMany({
            where: {
                id: incidentId,
                locationId,
            },
            data: incidentData,
        });
    }

    static async deleteIncident(locationId: string, incidentId: string) {
        return await prisma.incident.deleteMany({
            where: {
                id: incidentId,
                locationId,
            },
        });
    }

    static async getEquipment(locationId: string) {
        return await prisma.equipment.findMany({
            where: { locationId },
        });
    }

    static async addEquipment(locationId: string, equipmentData: any) {
        return await prisma.equipment.create({
            data: {
                ...equipmentData,
                locationId,
            },
        });
    }

    static async updateEquipment(locationId: string, equipmentId: string, equipmentData: any) {
        return await prisma.equipment.updateMany({
            where: {
                id: equipmentId,
                locationId,
            },
            data: equipmentData,
        });
    }

    static async deleteEquipment(locationId: string, equipmentId: string) {
        return await prisma.equipment.deleteMany({
            where: {
                id: equipmentId,
                locationId,
            },
        });
    }
}

export default LocationModel;
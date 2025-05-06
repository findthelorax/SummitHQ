import { prisma } from '../config/database';

class LocationModel {
    static async create(mountainID: string, data: any) {
        return await prisma.location.create({
            data: {
                ...data,
                mountainID,
            },
        });
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.location.findFirst({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.location.findMany({
            where: { mountainID },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.location.updateMany({
            where: {
                id,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.location.deleteMany({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async getHours(locationID: string) {
        return await prisma.hours.findMany({
            where: { locationID },
        });
    }

    static async addHours(locationID: string, hoursData: any[]) {
        if (!locationID) {
            throw new Error('Location ID is required.');
        }
    
        const locationExists = await prisma.location.findUnique({
            where: { id: locationID },
        });
    
        if (!locationExists) {
            throw new Error(`Location with ID ${locationID} does not exist.`);
        }
    
        const createdHours = [];
        for (const hour of hoursData) {
            const createdHour = await prisma.hours.create({
                data: {
                    ...hour,
                    locationID,
                },
            });
            createdHours.push(createdHour);
        }
    
        return createdHours;
    }

    static async updateHour(locationID: string, hourID: string, hourData: any) {
        if (!locationID || !hourID) {
            throw new Error('Location ID and Hour ID are required.');
        }
    
        const existingHour = await prisma.hours.findFirst({
            where: {
                id: hourID,
                locationID,
            },
        });
    
        if (!existingHour) {
            throw new Error(`Hour with ID ${hourID} for Location ID ${locationID} not found.`);
        }
    
        return await prisma.hours.update({
            where: {
                id: hourID,
            },
            data: hourData,
        });
    }

    static async deleteHour(locationID: string, hourID: string) {
        return await prisma.hours.deleteMany({
            where: {
                id: hourID,
                locationID,
            },
        });
    }

    static async getIncidents(locationID: string) {
        return await prisma.incident.findMany({
            where: { locationID },
        });
    }

    static async addIncident(locationID: string, incidentData: any) {
        return await prisma.incident.create({
            data: {
                ...incidentData,
                locationID,
            },
        });
    }

    static async updateIncident(locationID: string, incidentID: string, incidentData: any) {
        return await prisma.incident.updateMany({
            where: {
                id: incidentID,
                locationID,
            },
            data: incidentData,
        });
    }

    static async deleteIncident(locationID: string, incidentID: string) {
        return await prisma.incident.deleteMany({
            where: {
                id: incidentID,
                locationID,
            },
        });
    }

    static async findEquipmentByLocation(mountainID: string, locationID: string) {
        return await prisma.equipment.findMany({
            where: {
                mountainID,
                locationID,
            },
        });
    }

    static async moveEquipment(equipmentID: string, newLocationID: string) {
        return await prisma.equipment.update({
            where: { id: equipmentID },
            data: {
                locationID: newLocationID,
            },
        });
    }

    static async updateEquipmentInLocation(
        mountainID: string,
        locationID: string,
        equipmentID: string,
        updatedData: any
    ) {
        return await prisma.equipment.update({
            where: { id: equipmentID },
            data: {
                ...updatedData,
                mountainID,
                locationID,
            },
        });
    }

    static async deleteEquipmentFromLocation(
        mountainID: string,
        locationID: string,
        equipmentID: string
    ) {
        return await prisma.equipment.deleteMany({
            where: {
                id: equipmentID,
                mountainID,
                locationID,
            },
        });
    }

    static async addAreaToLocation(mountainID: string, locationID: string, areaID: string) {
        return await prisma.location.update({
            where: { id: locationID },
            data: {
                area: {
                    connect: { id: areaID },
                },
                mountain: {
                    connect: { id: mountainID },
                },
            },
        });
    }

    static async updateAreaInLocation(
        mountainID: string,
        locationID: string,
        areaID: string,
        updatedData: any
    ) {
        return await prisma.location.update({
            where: { id: locationID },
            data: {
                ...updatedData,
                area: {
                    connect: { id: areaID },
                },
                mountain: {
                    connect: { id: mountainID },
                },
            },
        });
    }

    static async removeAreaFromLocation(mountainID: string, locationID: string, areaID: string) {
        return await prisma.location.update({
            where: { id: locationID },
            data: {
                area: {
                    disconnect: { id: areaID },
                },
            },
        });
    }
}

export default LocationModel;
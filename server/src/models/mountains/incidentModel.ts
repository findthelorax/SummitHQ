import { prisma } from '../../config/database.js';

class IncidentModel {
    static async createIncident(mountainId: string, locationId: string, data: any) {
        const location = await prisma.location.findFirst({
            where: {
                id: locationId,
                mountainId,
            },
        });
    
        if (!location) {
            throw new Error(`Location with ID ${locationId} does not exist for Mountain ID ${mountainId}.`);
        }
    
        return await prisma.incident.create({
            data: {
                ...data,
                mountainId,
                locationId,
                entityId: location.entityId,
            },
        });
    }

    static async assignEmployee(incidentId: string, employeeId: string) {
        const incidentExists = await prisma.incident.findUnique({
            where: { id: incidentId },
        });
    
        if (!incidentExists) {
            throw new Error(`Incident with ID ${incidentId} does not exist.`);
        }
    
        const employeeExists = await prisma.employee.findUnique({
            where: { id: employeeId },
        });
    
        if (!employeeExists) {
            throw new Error(`Employee with ID ${employeeId} does not exist.`);
        }
    
        await prisma.incident.update({
            where: { id: incidentId },
            data: {
                employees: {
                    connect: { id: employeeId },
                },
            },
        });
    
        return await prisma.incident.findUnique({
            where: { id: incidentId },
            include: {
                location: true,
                mountain: true,
                employees: true,
            },
        });
    }

        static async updateAssignedEmployee(incidentId: string, oldEmployeeId: string, newEmployeeId: string) {
        const incidentExists = await prisma.incident.findUnique({
            where: { id: incidentId },
        });
    
        if (!incidentExists) {
            throw new Error(`Incident with ID ${incidentId} does not exist.`);
        }
    
        const oldEmployeeExists = await prisma.employee.findUnique({
            where: { id: oldEmployeeId },
        });
    
        if (!oldEmployeeExists) {
            throw new Error(`Employee with ID ${oldEmployeeId} does not exist.`);
        }
    
        const newEmployeeExists = await prisma.employee.findUnique({
            where: { id: newEmployeeId },
        });
    
        if (!newEmployeeExists) {
            throw new Error(`Employee with ID ${newEmployeeId} does not exist.`);
        }
    
        await prisma.incident.update({
            where: { id: incidentId },
            data: {
                employees: {
                    disconnect: { id: oldEmployeeId },
                    connect: { id: newEmployeeId },
                },
            },
        });
    
        return await prisma.incident.findUnique({
            where: { id: incidentId },
            include: {
                employees: true,
            },
        });
    }

    static async removeEmployee(incidentId: string, employeeId: string) {
        const incidentExists = await prisma.incident.findUnique({
            where: { id: incidentId },
        });
    
        if (!incidentExists) {
            throw new Error(`Incident with ID ${incidentId} does not exist.`);
        }
    
        const employeeExists = await prisma.employee.findUnique({
            where: { id: employeeId },
        });
    
        if (!employeeExists) {
            throw new Error(`Employee with ID ${employeeId} does not exist.`);
        }
    
        return await prisma.incident.update({
            where: { id: incidentId },
            data: {
                employees: {
                    disconnect: { id: employeeId },
                },
            },
        });
    }

    static async findByIdAndMountain(incidentId: string, mountainId: string) {
        return await prisma.incident.findFirst({
            where: {
                id: incidentId,
                mountainId,
            },
            include: {
                location: true,
                mountain: true,
                employees: true,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.incident.findMany({
            where: { mountainId },
            include: {
                location: true,
                mountain: true,
                employees: true,
            },
        });
    }

    static async findAll() {
        return await prisma.incident.findMany();
    }

    static async updateByMountain(incidentId: string, mountainId: string, updatedData: any) {
        return await prisma.incident.update({
            where: {
                id: incidentId,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(incidentId: string, mountainId: string) {
        return await prisma.incident.delete({
            where: {
                id: incidentId,
                mountainId,
            },
        });
    }
}

export default IncidentModel;
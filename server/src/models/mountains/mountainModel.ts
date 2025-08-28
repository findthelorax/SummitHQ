import { Decimal } from 'decimal.js';
import { prisma } from '../../config/database.js';

class MountainModel {
    static async create(data: any) {
        const safeData = {
            ...data,
            latitude: data.latitude !== null && data.latitude !== undefined ? new Decimal(data.latitude) : null,
            longitude: data.longitude !== null && data.longitude !== undefined ? new Decimal(data.longitude) : null,
            height: data.height !== null && data.height !== undefined ? new Decimal(data.height) : null,
            openingDate: data.openingDate ? new Date(data.openingDate).toISOString() : null,
            closingDate: data.closingDate ? new Date(data.closingDate).toISOString() : null,
        };
        return await prisma.mountain.create({ data: safeData });
    }

    static async findAll() {
        return await prisma.mountain.findMany();
    }

    // Best-practice: only core info and counts
    static async findById(mountainId: string) {
        return await prisma.mountain.findUnique({
            where: { id: mountainId },
            select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
                height: true,
                phoneNumber: true,
                address: true,
                city: true,
                state: true,
                zipcode: true,
                openingDate: true,
                closingDate: true,
                areas: true,
                _count: {
                    select: {
                        weather: true,
                        employeeAssignments: true,
                        locations: true,
                        aidRooms: true,
                        huts: true,
                        lodges: true,
                        lifts: true,
                        trails: true,
                        aidRoomChecks: true,
                        hutChecks: true,
                        liftChecks: true,
                        trailChecks: true,
                        equipmentChecks: true,
                        incidents: true,
                        equipment: true,
                    }
                }
            }
        });
    }

    // Weather history with pagination/filtering
    static async getWeather(mountainId: string, { limit = 20, offset = 0, order = 'desc' } = {}) {
        const take = Math.min(Number(limit) || 20, 100);
        const skip = Number(offset) || 0;
        const sortOrder = order === 'asc' ? 'asc' : 'desc';
        return await prisma.weather.findMany({
            where: { mountainId },
            orderBy: { date: sortOrder },
            skip,
            take,
        });
    }

    // Employees with pagination
    static async getEmployees(mountainId: string, { limit = 20, offset = 0 } = {}) {
        const take = Math.min(Number(limit) || 20, 100);
        const skip = Number(offset) || 0;
        return await prisma.employeeMountainAssignment.findMany({
            where: { mountainId },
            skip,
            take,
            include: {
                employee: {
                    include: { role: true, additionalRoles: true }
                }
            }
        });
    }

    // Locations with pagination
    static async getLocations(mountainId: string, { limit = 20, offset = 0 } = {}) {
        const take = Math.min(Number(limit) || 20, 100);
        const skip = Number(offset) || 0;
        return await prisma.location.findMany({
            where: { mountainId },
            skip,
            take,
            include: {
                hours: true,
                equipment: true,
                incidents: true,
            }
        });
    }

    // Checks with pagination (example for liftChecks, repeat for others)
    static async getLiftChecks(mountainId: string, { limit = 20, offset = 0 } = {}) {
        const take = Math.min(Number(limit) || 20, 100);
        const skip = Number(offset) || 0;
        return await prisma.liftCheck.findMany({
            where: { mountainId },
            skip,
            take,
            include: {
                lift: true,
                employee: true,
            }
        });
    }

    // Add similar methods for aidRoomChecks, hutChecks, trailChecks, equipmentChecks, incidents, etc.

    static async update(mountainId: string, updatedData: any) {
        const safeData = {
            ...updatedData,
            latitude: updatedData.latitude !== null && updatedData.latitude !== undefined ? new Decimal(updatedData.latitude) : null,
            longitude: updatedData.longitude !== null && updatedData.longitude !== undefined ? new Decimal(updatedData.longitude) : null,
            height: updatedData.height !== null && updatedData.height !== undefined ? new Decimal(updatedData.height) : null,
            openingDate: updatedData.openingDate ? new Date(updatedData.openingDate).toISOString() : null,
            closingDate: updatedData.closingDate ? new Date(updatedData.closingDate).toISOString() : null,
        };
        return await prisma.mountain.update({
            where: { id: mountainId },
            data: safeData,
        });
    }

    static async delete(mountainId: string) {
        await prisma.location.deleteMany({ where: { mountainId } });
        return await prisma.mountain.delete({ where: { id: mountainId } });
    }

    static async deleteAll() {
        await prisma.location.deleteMany();
        return await prisma.mountain.deleteMany();
    }
}

export default MountainModel;
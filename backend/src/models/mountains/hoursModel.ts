import { prisma } from '../../config/database';

class HoursModel {
    static async create(locationId: string, data: any[]) {
        const hoursData = data.map(hour => ({
            ...hour,
            locationId,
        }));

        return await prisma.hours.createMany({
            data: hoursData,
        });
    }

    static async findAllByLocation(locationId: string) {
        return await prisma.hours.findMany({
            where: {
                locationId,
            },
        });
    }

    static async findAll() {
        return await prisma.hours.findMany();
    }

    static async findByIdAndLocation(hourId: string, locationId: string) {
        return await prisma.hours.findFirst({
            where: {
                id: hourId,
                locationId,
            },
        });
    }

    static async updateByLocation(hourId: string, locationId: string, updatedData: any) {
        return await prisma.hours.update({
            where: {
                id: hourId,
            },
            data: {
                ...updatedData,
                location: {
                    connect: { hourId: locationId },
                },
            },
        });
    }

    static async deleteByLocation(hourId: string) {
        return await prisma.hours.delete({
            where: {
                id: hourId,
            },
        });
    }
}

export default HoursModel;
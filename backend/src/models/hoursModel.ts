import { prisma } from '../config/database';

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

    static async findByIdAndLocation(id: string, locationId: string) {
        return await prisma.hours.findFirst({
            where: {
                id,
                locationId,
            },
        });
    }

    static async updateByLocation(id: string, locationId: string, updatedData: any) {
        return await prisma.hours.update({
            where: {
                id,
            },
            data: {
                ...updatedData,
                location: {
                    connect: { id: locationId },
                },
            },
        });
    }

    static async deleteByLocation(id: string) {
        return await prisma.hours.delete({
            where: {
                id,
            },
        });
    }
}

export default HoursModel;
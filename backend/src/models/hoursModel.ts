import { prisma } from '../config/database';

class HoursModel {
    static async create(locationID: string, data: any[]) {
        const hoursData = data.map(hour => ({
            ...hour,
            locationID,
        }));

        return await prisma.hours.createMany({
            data: hoursData,
        });
    }

    static async findAllByLocation(locationID: string) {
        return await prisma.hours.findMany({
            where: {
                locationID,
            },
        });
    }

    static async findByIdAndLocation(id: string, locationID: string) {
        return await prisma.hours.findFirst({
            where: {
                id,
                locationID,
            },
        });
    }

    static async updateByLocation(id: string, locationID: string, updatedData: any) {
        return await prisma.hours.update({
            where: {
                id,
            },
            data: {
                ...updatedData,
                location: {
                    connect: { id: locationID },
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
import { prisma } from '../config/database';

class AreaModel {

    static async create(mountainID: string, data: any) {
        try {
            // Validate that the mountainID exists
            const mountainExists = await prisma.mountain.findUnique({
                where: { id: mountainID },
            });

            if (!mountainExists) {
                const err = new Error('Mountain not found') as any;
                err.status = 404;
                throw err;
            }

            // Create the area
            return await prisma.area.create({
                data: {
                    ...data,
                    mountainID: mountainID, // Use the correct field name
                },
            });
        } catch (error) {
            const err = new Error('Failed to create area') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async findByIdAndMountain(areaID: string, mountainID: string) {
        return await prisma.area.findFirst({
            where: {
                id: areaID,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.area.findMany({
            where: { mountainID },
        });
    }

    static async updateById(id: string, updatedData: any) {
        return await prisma.area.update({
            where: { id },
            data: updatedData,
        });
    }

    static async deleteById(id: string) {
        return await prisma.area.delete({
            where: { id },
        });
    }

    static async addAreaToLocation(locationID: string, areaID: string) {
        return await prisma.location.update({
            where: { id: locationID },
            data: { areaID },
        });
    }

    static async updateAreaInLocation(locationID: string, mountainID: string, updatedData: any) {
        return await prisma.location.update({
            where: {
                id: locationID,
                mountainID,
            },
            data: updatedData,
        });
    }

    static async removeAreaFromLocation(locationID: string) {
        return await prisma.location.update({
            where: { id: locationID },
            data: { areaID: null },
        });
    }
}

export default AreaModel;
import { prisma } from '../config/database';

class AreaModel {

    static async create(mountainId: string, data: any) {
        const mountainExists = await prisma.mountain.findUnique({
            where: { id: mountainId },
        });
    
        if (!mountainExists) {
            throw new Error('Mountain not found');
        }
    
        return await prisma.area.create({
            data: {
                ...data,
                mountainId: mountainId,
            },
        });
    }

    static async findAll() {
        return await prisma.area.findMany();
    }

    static async findByIdAndMountain(areaId: string, mountainId: string) {
        return await prisma.area.findFirst({
            where: {
                id: areaId,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.area.findMany({
            where: { mountainId },
        });
    }

    static async updateById(areaId: string, updatedData: any) {
        return await prisma.area.update({
            where: { id: areaId },
            data: updatedData,
        });
    }

    static async deleteById(areaId: string) {
        if (!areaId) {
            const err = new Error('Invalid Id provided for deletion') as any;
            err.status = 400;
            throw err;
        }
    
        return await prisma.area.delete({
            where: { id: areaId },
        });
    }

    static async addAreaToLocation(locationId: string, areaId: string) {
        return await prisma.location.update({
            where: { id: locationId },
            data: { areaId },
        });
    }

    static async updateAreaInLocation(locationId: string, mountainId: string, updatedData: any) {
        return await prisma.location.update({
            where: {
                id: locationId,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async removeAreaFromLocation(locationId: string) {
        return await prisma.location.update({
            where: { id: locationId },
            data: { areaId: null },
        });
    }
}

export default AreaModel;
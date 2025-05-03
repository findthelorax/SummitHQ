import { prisma } from '../config/database';

class AreaModel {
    static async create(mountainId: string, data: any) {
        return await prisma.area.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.area.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.area.findMany({
            where: { mountainId },
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
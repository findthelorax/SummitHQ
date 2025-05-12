import { prisma } from '../config/database';

class EquipmentModel {
    static async create(data: any, mountainId: string) {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid data format: expected an object');
        }
    
        const { locationId, ...rest } = data;
    
        if (!rest.name || !rest.type || !rest.status) {
            throw new Error('Missing required fields');
        }
    
        return await prisma.equipment.create({
            data: {
                ...rest,
                mountain: {
                    connect: { id: mountainId },
                },
                location: locationId ? { connect: { id: locationId } } : undefined,
            },
        });
    }

    static async findAll() {
        return await prisma.equipment.findMany();
    }

    static async findAllByLocation(mountainId: string, locationId: string) {
        return await prisma.equipment.findMany({
            where: {
                mountainId,
                locationId: locationId,
            },
        });
    }
    
    static async moveToLocation(equipmentId: string, newLocationId: string) {
        return await prisma.equipment.update({
            where: { id: equipmentId },
            data: {
                locationId: newLocationId,
            },
        });
    }

    static async findByIdAndMountain(equipmentId: string, mountainId: string) {
        return await prisma.equipment.findFirst({
            where: {
                id: equipmentId,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.equipment.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(equipmentId: string, mountainId: string, updatedData: any) {
        return await prisma.equipment.update({
            where: {
                id: equipmentId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(equipmentId: string, mountainId: string) {
        return await prisma.equipment.deleteMany({
            where: {
                id: equipmentId,
                mountainId,
            },
        });
    }
}

export default EquipmentModel;
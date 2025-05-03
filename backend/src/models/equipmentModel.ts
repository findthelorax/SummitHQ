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

    static async findAllByLocation(mountainId: string, locationId: string) {
        console.log("🚀 ~ EquipmentModel ~ findAllByLocation ~ locationId:", locationId)
        console.log("🚀 ~ EquipmentModel ~ findAllByLocation ~ mountainId:", mountainId)
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

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.equipment.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.equipment.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.equipment.update({
            where: {
                id,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.equipment.deleteMany({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default EquipmentModel;
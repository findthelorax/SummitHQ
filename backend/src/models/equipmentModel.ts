import { prisma } from '../config/database';

class EquipmentModel {
    static async create(data: any, mountainID: string) {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid data format: expected an object');
        }

        const { locationID, ...rest } = data;

        if (!rest.name || !rest.type || !rest.status) {
            throw new Error('Missing required fields');
        }

        return await prisma.equipment.create({
            data: {
                ...rest,
                mountain: {
                    connect: { id: mountainID },
                },
                location: locationID ? { connect: { id: locationID } } : undefined,
            },
        });
    }

    static async findAllByLocation(mountainID: string, locationID: string) {
        console.log("🚀 ~ EquipmentModel ~ findAllByLocation ~ locationID:", locationID)
        console.log("🚀 ~ EquipmentModel ~ findAllByLocation ~ mountainID:", mountainID)
        return await prisma.equipment.findMany({
            where: {
                mountainID,
                locationID: locationID,
            },
        });
    }
    
    static async moveToLocation(equipmentID: string, newLocationID: string) {
        return await prisma.equipment.update({
            where: { id: equipmentID },
            data: {
                locationID: newLocationID,
            },
        });
    }

    static async findByIdAndMountain(id: string, mountainID: string) {
        return await prisma.equipment.findFirst({
            where: {
                id,
                mountainID,
            },
        });
    }

    static async findAllByMountain(mountainID: string) {
        return await prisma.equipment.findMany({
            where: { mountainID },
        });
    }

    static async updateByMountain(id: string, mountainID: string, updatedData: any) {
        return await prisma.equipment.update({
            where: {
                id,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainID: string) {
        return await prisma.equipment.deleteMany({
            where: {
                id,
                mountainID,
            },
        });
    }
}

export default EquipmentModel;
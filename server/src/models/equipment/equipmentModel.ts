import { prisma } from '../../config/database.js';
import { getNextEquipmentNumber } from '../../utils/getNextEquipmentNumber.ts';

class EquipmentModel {
    static async create(data: any, mountainId?: string) {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Invalid data format: expected an object');
        }

        const { mountainId: _mountainId, locationId, number, ...rest } = data;

        if (!rest.name || !rest.type || !rest.status) {
            throw new Error('Missing required fields');
        }

        let assignedNumber = number;
        if (assignedNumber === undefined || assignedNumber === null) {
            assignedNumber = await getNextEquipmentNumber(mountainId);
        }

        const dataToCreate: any = {
            ...rest,
            number: assignedNumber,
            ...(mountainId ? { mountain: { connect: { id: mountainId } } } : {}),
            location: locationId ? { connect: { id: locationId } } : undefined,
        };

        return await prisma.equipment.create({
            data: dataToCreate,
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

    static async assignToLocation(equipmentId: string, locationId: string, mountainId: string) {
        // Ensure equipment and location both belong to the same mountain
        const equipment = await prisma.equipment.findFirst({
            where: { id: equipmentId, mountainId },
        });
        const location = await prisma.location.findFirst({
            where: { id: locationId, mountainId },
        });
        if (!equipment || !location) return null;

        return await prisma.equipment.update({
            where: { id: equipmentId },
            data: { locationId },
        });
    }

    static async removeFromLocation(equipmentId: string, locationId: string, mountainId: string) {
        // Ensure equipment and location both belong to the same mountain
        const equipment = await prisma.equipment.findFirst({
            where: { id: equipmentId, mountainId, locationId },
        });
        if (!equipment) return null;

        return await prisma.equipment.update({
            where: { id: equipmentId },
            data: { locationId: null },
        });
    }

    static async moveToLocation(equipmentId: string, newLocationId: string, mountainId: string) {
        // Ensure equipment and new location both belong to the same mountain
        const equipment = await prisma.equipment.findFirst({
            where: { id: equipmentId, mountainId },
        });
        const location = await prisma.location.findFirst({
            where: { id: newLocationId, mountainId },
        });
        if (!equipment || !location) return null;

        return await prisma.equipment.update({
            where: { id: equipmentId },
            data: { locationId: newLocationId },
        });
    }

	static async assignToMountain(equipmentId: string, mountainId: string) {
		// Only assign if not already assigned to this mountain
		const equipment = await prisma.equipment.findFirst({
			where: { id: equipmentId, mountainId },
		});
		if (equipment) return null;
		return await prisma.equipment.update({
			where: { id: equipmentId },
			data: { mountainId },
		});
	}

	static async removeFromMountain(equipmentId: string, mountainId: string) {
		// Only remove if currently assigned to this mountain
		const equipment = await prisma.equipment.findFirst({
			where: { id: equipmentId, mountainId },
		});
		if (!equipment) return null;
		return await prisma.equipment.update({
			where: { id: equipmentId },
			data: { mountainId: undefined },
		});
	}
}

export default EquipmentModel;

import { prisma } from '../config/database';
import { Status } from '../types';

class AidRoom {
    static async create(
		mountainId: string, 
		data: { name: string; location: string; status: Status }
	) {
        return await prisma.aidRoom.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.aidRoom.findUnique({
            where: { id },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.aidRoom.findMany({
            where: { mountainId },
        });
    }

    static async update(id: string, updatedData: Partial<{ name: string; location: string; status: Status }>) {
        return await prisma.aidRoom.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.aidRoom.delete({
            where: { id },
        });
    }
}

export default AidRoom;
import { prisma } from '../config/database';
import { Status } from '../types';

class LodgeModel {
	static async create(
        mountainId: string, 
        data: { name: string; capacity: number; status: Status }
    ) {
		return await prisma.lodge.create({
			data: {
				...data,
				mountainId,
			},
		});
	}

	static async findById(id: string) {
		return await prisma.lodge.findUnique({ where: { id } });
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.lodge.findMany({
			where: { mountainId },
		});
	}

	static async update(id: string, updatedData: Partial<{ name: string; capacity: number; status: Status }>) {
		return await prisma.lodge.update({
			where: { id },
			data: updatedData,
		});
	}

	static async delete(id: string) {
		return await prisma.lodge.delete({ where: { id } });
	}
}

export default LodgeModel;

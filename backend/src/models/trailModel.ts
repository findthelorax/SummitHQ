import { prisma } from '../config/database';
import { Status, TrailDifficulty, TrailCondition } from '../types';

type TrailCreateInput = {
	name: string;
	difficulty: TrailDifficulty;
	length: number;
	status?: Status;
	condition?: TrailCondition;
};

type TrailUpdateInput = Partial<TrailCreateInput>;

class Trail {
	static async create(mountainId: string, data: TrailCreateInput) {
		return await prisma.trail.create({
			data: {
				...data,
				status: data.status ?? Status.UNKNOWN,
				condition: data.condition ?? TrailCondition.CLOSED,
				mountainId,
			},
		});
	}

	static async findById(id: string) {
		return await prisma.trail.findUnique({
			where: { id },
		});
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.trail.findMany({
			where: { mountainId },
		});
	}

	static async update(id: string, updatedData: TrailUpdateInput) {
		return await prisma.trail.update({
			where: { id },
			data: updatedData,
		});
	}

	static async delete(id: string) {
		return await prisma.trail.delete({
			where: { id },
		});
	}
}

export default Trail;

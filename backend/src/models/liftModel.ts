import { prisma } from '../config/database';
import { Status } from '../types';

type LiftCreateInput = {
	name: string;
	capacity: number;
	status?: Status;
};

type LiftUpdateInput = Partial<LiftCreateInput>;

class Lift {
	static async create(mountainId: string, data: LiftCreateInput) {
		return await prisma.lift.create({
			data: {
				...data,
				status: data.status ?? Status.UNKNOWN,
				mountainId,
			},
		});
	}

	static async findById(id: string) {
		return await prisma.lift.findUnique({
			where: { id },
		});
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.lift.findMany({
			where: { mountainId },
		});
	}

	static async update(id: string, updatedData: LiftUpdateInput) {
		return await prisma.lift.update({
			where: { id },
			data: updatedData,
		});
	}

	static async delete(id: string) {
		return await prisma.lift.delete({
			where: { id },
		});
	}
}

export default Lift;

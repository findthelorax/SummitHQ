import { prisma } from '../../config/database.js';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation.js';
import { updateEntityLocationArea } from '../../utils/updateEntityWithLocation.js';
import { capitalizeWords } from '../../utils/capitalizeWords.js';
import { locationWithAreaInclude } from '../../utils/prismaIncludes.js';

class LiftModel {
	static async create(mountainId: string, data: any, areaId?: string) {
		if (data.name) {
			data.name = capitalizeWords(data.name);
		}
		return await createEntityWithLocation('lift', mountainId, data, areaId);
	}

	static async findByIdAndMountain(liftId: string, mountainId: string) {
		return await prisma.lift.findFirst({
			where: {
				id: liftId,
				mountainId,
			},
			include: locationWithAreaInclude,
		});
	}

	static async findAll() {
		return await prisma.lift.findMany({ include: locationWithAreaInclude });
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.lift.findMany({
			where: { mountainId },
			include: locationWithAreaInclude,
		});
	}

		static async updateById(liftId: string, updatedData: any) {
			const { areaId, ...liftUpdate } = updatedData;
	
			if (liftUpdate.name) {
				liftUpdate.name = capitalizeWords(liftUpdate.name);
			}
	
			const updatedLift = await prisma.lift.update({
				where: { id: liftId },
				data: liftUpdate,
				include: locationWithAreaInclude,
			});
	
			if (areaId !== undefined) {
				await updateEntityLocationArea('lift', updatedLift.mountainId, liftId, areaId);
			}
	
			return updatedLift;
		}

	static async deleteById(liftId: string) {
		return await prisma.$transaction(async (prisma) => {
			const deletedLift = await prisma.lift.delete({
				where: {
					id: liftId,
				},
			});

			await prisma.location.delete({
				where: {
					entityId: liftId,
					entityType: 'LIFT',
				},
			});

			return deletedLift;
		});
	}
}

export default LiftModel;

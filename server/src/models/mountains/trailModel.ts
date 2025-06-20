import { prisma } from '../../config/database.js';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation.js';
import { updateEntityLocationArea } from '../../utils/updateEntityWithLocation.js';
import { capitalizeWords } from '../../utils/capitalizeWords.js';
import { locationWithAreaInclude } from '../../utils/prismaIncludes.js';

class TrailModel {
	static async create(mountainId: string, data: any, areaId?: string) {
		const mountainExists = await prisma.mountain.findUnique({
			where: { id: mountainId },
		});
		if (!mountainExists) {
			throw new Error(`Mountain with ID ${mountainId} does not exist.`);
		}
		if (data.name) {
			data.name = capitalizeWords(data.name);
		}
		return await createEntityWithLocation('trail', mountainId, data, areaId);
	}

	static async findByIdAndMountain(trailId: string, mountainId: string) {
		return await prisma.trail.findFirst({
			where: {
				id: trailId,
				mountainId,
			},
			include: locationWithAreaInclude,
		});
	}

	static async findAll() {
		return await prisma.trail.findMany({
			include: locationWithAreaInclude,
		});
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.trail.findMany({
			where: { mountainId },
			include: locationWithAreaInclude,
		});
	}

	static async updateById(trailId: string, updatedData: any) {
		const { areaId, ...trailUpdate } = updatedData;

		if (trailUpdate.name) {
			trailUpdate.name = capitalizeWords(trailUpdate.name);
		}

		const updatedTrail = await prisma.trail.update({
			where: { id: trailId },
			data: trailUpdate,
			include: locationWithAreaInclude,
		});

		if (areaId !== undefined) {
			await updateEntityLocationArea('trail', updatedTrail.mountainId, trailId, areaId);
		}

		return updatedTrail;
	}

	static async deleteById(trailId: string) {
		return await prisma.$transaction(async (prisma) => {
			const deletedTrail = await prisma.trail.delete({
				where: {
					id: trailId,
				},
			});

			await prisma.location.delete({
				where: {
					entityId: trailId,
					entityType: 'TRAIL',
				},
			});

			return deletedTrail;
		});
	}
}

export default TrailModel;

import { prisma } from '../../config/database.js';

class AidRoomCheckModel {
	static async create(data: any) {
		return await prisma.aidRoomCheck.create({ data });
	}

	static async findAllByMountainAndAidRoom(mountainId: string, aidRoomId: string) {
		return await prisma.aidRoomCheck.findMany({
			where: {
				mountainId,
				aidRoomId,
			},
			include: {
				employee: {
					select: { firstName: true, lastName: true, primaryDepartment: true },
				},
			},
		});
	}

	static async findByIdAndMountainAndAidRoom(id: string, mountainId: string, aidRoomId: string) {
		return await prisma.aidRoomCheck.findFirst({
			where: {
				id,
				mountainId,
				aidRoomId,
			},
			include: {
				employee: {
					select: { firstName: true, lastName: true, primaryDepartment: true },
				},
			},
		});
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.aidRoomCheck.findMany({
			where: {
				mountainId,
			},
			include: {
				aidRoom: { select: { name: true } },
				employee: {
					select: { firstName: true, lastName: true, primaryDepartment: true },
				},
			},
		});
	}

	static async updateByIdAndMountainAndAidRoom(id: string, mountainId: string, aidRoomId: string, updatedData: any) {
		return await prisma.aidRoomCheck.update({
			where: {
				id,
				mountainId,
				aidRoomId,
			},
			data: updatedData,
		});
	}

	static async deleteByIdAndMountainAndAidRoom(id: string, mountainId: string, aidRoomId: string) {
		return await prisma.aidRoomCheck.delete({
			where: {
				id,
				mountainId,
				aidRoomId,
			},
		});
	}
}

export default AidRoomCheckModel;

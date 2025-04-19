import { prisma } from '../config/database';

class Mountain {
	static async create(data: {
		name: string;
		latitude: number;
		longitude: number;
		height: number;
		hours: string;
		phoneNumber: string;
		address: string;
		city: string;
		state: string;
		zipcode: string;
	}) {
		return await prisma.mountain.create({
			data: {
				...data,
			},
		});
	}

	static async findAll() {
		return await prisma.mountain.findMany();
	}

	static async findById(id: string) {
		return await prisma.mountain.findUnique({
			where: { id },
		});
	}

	static async update(id: string, updatedData: Partial<Mountain>) {
		return await prisma.mountain.update({
			where: { id },
			data: updatedData,
		});
	}

	static async delete(id: string) {
		return await prisma.mountain.delete({
			where: { id },
		});
	}
}

export default Mountain;

import { prisma } from '../config/database';

class MountainModel {
    static async create(data: any) {
        const mountain = await prisma.mountain.create({
            data: {
                ...data,
            },
        });

        await prisma.location.create({
            data: {
                mountainId: mountain.id,
                type: 'Mountain',
                name: mountain.name,
            },
        });

        return mountain;
    }

    static async findAll() {
        return await prisma.mountain.findMany();
    }

    static async findById(id: string) {
        return await prisma.mountain.findUnique({
            where: { id },
            include: {
                locations: {
                    include: {
                        hours: true,
                        equipment: true,
                        incidents: true,
                    },
                },
            },
        });
    }

    static async update(id: string, updatedData: any) {
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

    static async deleteAll() {
        return await prisma.mountain.deleteMany();
    }
}

export default MountainModel;
import { prisma } from '../config/database';

class MountainModel {
    static async create(data: any) {
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
        return await prisma.mountain.deleteMany(); // Deletes all records in the Mountain table
    }
}

export default MountainModel;
import { prisma } from '../config/database';
import { createEntityWithLocation } from '../utils/createEntityWithLocation';

class MountainModel {
    static async create(data: any) {
        // Pass undefined for mountainId since it will be set to the created mountain's ID
        return await createEntityWithLocation(prisma, 'mountain', undefined, data);
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
        // Delete associated locations first to avoid foreign key constraint errors
        await prisma.location.deleteMany({
            where: { mountainId: id },
        });

        return await prisma.mountain.delete({
            where: { id },
        });
    }

    static async deleteAll() {
        // Delete all associated locations first
        await prisma.location.deleteMany();

        return await prisma.mountain.deleteMany();
    }
}

export default MountainModel;
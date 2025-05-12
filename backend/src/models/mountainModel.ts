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

    static async findById(mountainId: string) {
        return await prisma.mountain.findUnique({
            where: { id: mountainId },
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

    static async update(mountainId: string, updatedData: any) {
        return await prisma.mountain.update({
            where: { id: mountainId },
            data: updatedData,
        });
    }

    static async delete(mountainId: string) {
        await prisma.location.deleteMany({
            where: { mountainId: mountainId },
        });

        return await prisma.mountain.delete({
            where: { id: mountainId },
        });
    }

    static async deleteAll() {
        await prisma.location.deleteMany();

        return await prisma.mountain.deleteMany();
    }
}

export default MountainModel;
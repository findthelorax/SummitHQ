import { Decimal } from 'decimal.js';
import { prisma } from '../../config/database.js';
import { createEntityWithLocation } from '../../utils/createEntityWithLocation.js';

class MountainModel {
    static async create(data: any) {
        // Safely convert numeric values to Decimal and date strings to ISO-8601
        const safeData = {
            ...data,
            latitude: data.latitude !== null && data.latitude !== undefined ? new Decimal(data.latitude) : null,
            longitude: data.longitude !== null && data.longitude !== undefined ? new Decimal(data.longitude) : null,
            height: data.height !== null && data.height !== undefined ? new Decimal(data.height) : null,
            openingDate: data.openingDate ? new Date(data.openingDate).toISOString() : null,
            closingDate: data.closingDate ? new Date(data.closingDate).toISOString() : null,
        };

        // Pass undefined for mountainId since it will be set to the created mountain's ID
        return await createEntityWithLocation(prisma, 'mountain', undefined, safeData);
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
        const safeData = {
            ...updatedData,
            latitude: updatedData.latitude !== null && updatedData.latitude !== undefined ? new Decimal(updatedData.latitude) : null,
            longitude: updatedData.longitude !== null && updatedData.longitude !== undefined ? new Decimal(updatedData.longitude) : null,
            height: updatedData.height !== null && updatedData.height !== undefined ? new Decimal(updatedData.height) : null,
            openingDate: updatedData.openingDate ? new Date(updatedData.openingDate).toISOString() : null,
            closingDate: updatedData.closingDate ? new Date(updatedData.closingDate).toISOString() : null,
        };

        return await prisma.mountain.update({
            where: { id: mountainId },
            data: safeData,
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
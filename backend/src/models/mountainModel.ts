import { prisma } from '../config/database';

class MountainModel {
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
        openingDate?: Date;
        closingDate?: Date;
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

    static async update(
        id: string,
        updatedData: Partial<{
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
            openingDate?: Date;
            closingDate?: Date;
        }>
    ) {
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

export default MountainModel;
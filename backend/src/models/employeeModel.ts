import { prisma } from '../config/database';

class Employee {
    static async create(mountainId: string, data: any) {
        return await prisma.employee.create({
            data: {
                ...data,
                mountainId,
            },
        });
    }

    static async findByIdAndMountain(id: string, mountainId: string) {
        return await prisma.employee.findFirst({
            where: {
                id,
                mountainId,
            },
        });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.employee.findMany({
            where: { mountainId },
        });
    }

    static async updateByMountain(id: string, mountainId: string, updatedData: any) {
        return await prisma.employee.updateMany({
            where: {
                id,
                mountainId,
            },
            data: updatedData,
        });
    }

    static async deleteByMountain(id: string, mountainId: string) {
        return await prisma.employee.deleteMany({
            where: {
                id,
                mountainId,
            },
        });
    }
}

export default Employee;
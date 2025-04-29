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

    static async findById(id: string) {
        return await prisma.employee.findUnique({ where: { id } });
    }

    static async findAllByMountain(mountainId: string) {
        return await prisma.employee.findMany({ where: { mountainId } });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.employee.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.employee.delete({ where: { id } });
    }
}

export default Employee;
import { prisma } from '../config/database';

class AssignModel {
    static async create(employeeId: string, mountainId: string) {
        return await prisma.dispatcherAssignment.create({
            data: {
                employeeId,
                mountainId,
            },
        });
    }

    static async findAll() {
        return await prisma.dispatcherAssignment.findMany();
    }

    static async findById(id: string) {
        return await prisma.dispatcherAssignment.findUnique({
            where: { id },
        });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.dispatcherAssignment.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.dispatcherAssignment.delete({
            where: { id },
        });
    }
}

export default AssignModel;
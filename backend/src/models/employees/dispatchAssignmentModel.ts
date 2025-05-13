import { prisma } from '../../config/database';

class DispathcAssignmentModel {
    static async create(employeeId: string, mountainId: string) {
            const today = new Date();
            const assignedAt = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
            const existingAssignment = await prisma.dispatcherAssignment.findFirst({
                where: {
                    employeeId,
                    mountainId,
                    assignedAt: assignedAt,
                },
            });
    
            if (existingAssignment) {
                throw new Error('An assignment already exists for this employee, mountain, and date.');
            }
    
            return await prisma.dispatcherAssignment.create({
                data: {
                    employeeId,
                    mountainId,
                    assignedAt,
                },
            });
    }

    static async findAll() {
        return await prisma.dispatcherAssignment.findMany();
    }

static async findById(assignmentId: string) {
    if (!assignmentId) {
        throw new Error('Invalid assignmentId: assignmentId is required');
    }

    return await prisma.dispatcherAssignment.findUnique({
        where: { id: assignmentId },
    });
}

    static async update(assignmentId: string, updatedData: any) {
        return await prisma.dispatcherAssignment.update({
            where: { id: assignmentId },
            data: updatedData,
        });
    }

    static async delete(assignmentId: string) {
        return await prisma.dispatcherAssignment.delete({
            where: { id: assignmentId },
        });
    }
}

export default DispathcAssignmentModel;
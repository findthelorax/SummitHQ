import { prisma } from '../../config/database';

class EmployeeMountainAssignmentModel {
    static async create(employeeId: string, mountainId: string, assignedAt: Date) {
            const existingAssignment = await prisma.employeeMountainAssignment.findFirst({
                where: {
                    employeeId,
                    mountainId,
                },
            });

            if (existingAssignment) {
                throw new Error('This employee is already assigned to this mountain.');
            }

            return await prisma.employeeMountainAssignment.create({
                data: {
                    employeeId,
                    mountainId,
                    assignedAt,
                },
            });
    }

    static async findAll() {
            return await prisma.employeeMountainAssignment.findMany();
    }

    static async findById(assignmentId: string) {
            return await prisma.employeeMountainAssignment.findUnique({
                where: { id: assignmentId },
            });
    }

    static async update(assignmentId: string, updatedData: any) {
            return await prisma.employeeMountainAssignment.update({
                where: { id: assignmentId },
                data: updatedData,
            });
    }

    static async delete(assignmentId: string) {
            return await prisma.employeeMountainAssignment.delete({
                where: { id: assignmentId },
            });
    }
}

export default EmployeeMountainAssignmentModel;
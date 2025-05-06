import { prisma } from '../config/database';

class EmployeeMountainAssignmentModel {
    static async create(employeeID: string, mountainID: string) {
        return await prisma.employeeMountainAssignment.create({
            data: {
                employeeID,
                mountainID,
            },
        });
    }

    static async findAll() {
        return await prisma.employeeMountainAssignment.findMany();
    }

    static async findById(id: string) {
        return await prisma.employeeMountainAssignment.findUnique({
            where: { id },
        });
    }

    static async update(id: string, updatedData: any) {
        return await prisma.employeeMountainAssignment.update({
            where: { id },
            data: updatedData,
        });
    }
    
    static async delete(id: string) {
        return await prisma.employeeMountainAssignment.delete({
            where: { id },
        });
    }
}

export default EmployeeMountainAssignmentModel;
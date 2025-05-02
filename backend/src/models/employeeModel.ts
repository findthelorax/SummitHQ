import { prisma } from '../config/database';

class Employee {
    static async create(employeeData: any) {
        // Create the employee without assigning them to a mountain
        return await prisma.employee.create({
            data: employeeData,
        });
    }

    static async assignToMountain(employeeId: string, mountainId: string) {
        if (!employeeId || !mountainId) {
            throw new Error("Both employeeId and mountainId are required to create an assignment.");
        }

        // Create the assignment
        return await prisma.employeeMountainAssignment.create({
            data: {
                employeeId,
                mountainId,
            },
        });
    }

    static async findById(id: string) {
        return await prisma.employee.findUnique({
            where: { id },
        });
    }

    static async findAll() {
        return await prisma.employee.findMany();
    }

    static async update(id: string, updatedData: any) {
        return await prisma.employee.update({
            where: { id },
            data: updatedData,
        });
    }

    static async delete(id: string) {
        return await prisma.employee.delete({
            where: { id },
        });
    }
}

export default Employee;
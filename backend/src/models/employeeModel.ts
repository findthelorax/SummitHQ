import { prisma } from '../config/database';

class Employee {
    static async create(mountainId: string, employeeData: any) {
        return await prisma.$transaction(async (tx) => {
            // 1. Create the employee
            const newEmployee = await tx.employee.create({
                data: employeeData,
            });

            // 2. Create the assignment
            await tx.employeeMountainAssignment.create({
                data: {
                    employeeId: newEmployee.id,
                    mountainId,
                },
            });

            return newEmployee;
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

import { prisma } from '../config/database';

class Employee {
    static async create(employeeData: any) {
            const lastEmployee = await prisma.employee.findFirst({
                orderBy: { employeeIdNumber: 'desc' },
            });

            const newEmployeeIdNumber = lastEmployee
                ? lastEmployee.employeeIdNumber + 1
                : 30000;

            return await prisma.employee.create({
                data: {
                    ...employeeData,
                    employeeIdNumber: newEmployeeIdNumber,
                },
            });
    }

    static async assignToMountain(employeeId: string, mountainId: string) {
            if (!employeeId || !mountainId) {
                const err = new Error('Both employeeId and mountainId are required') as any;
                err.status = 400;
                throw err;
            }

            return await prisma.employeeMountainAssignment.create({
                data: {
                    employeeId,
                    mountainId,
                    assignedAt: new Date(),
                },
            });
    }

    static async findById(employeeId: string) {
            if (!employeeId) {
                const err = new Error('Employee Id is required') as any;
                err.status = 400;
                throw err;
            }

            const employee = await prisma.employee.findUnique({
                where: { id: employeeId },
            });

            if (!employee) {
                const err = new Error('Employee not found') as any;
                err.status = 404;
                throw err;
            }

            return employee;
    }

    static async findAll() {
            return await prisma.employee.findMany();
    }

    static async update(employeeId: string, updatedData: any) {
            return await prisma.employee.update({
                where: { id: employeeId },
                data: updatedData,
            });
    }

    static async delete(employeeId: string) {
            return await prisma.employee.delete({
                where: { id: employeeId },
            });
    }

    static async createRole(roleData: any) {
            return await prisma.role.create({
                data: roleData,
            });
    }

    static async getAllRoles() {
            return await prisma.role.findMany();
    }

    static async getRoleById(roleId: string) {
            const role = await prisma.role.findUnique({
                where: { id: roleId },
            });

            if (!role) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }

            return role;
    }

    static async updateRole(roleId: string, updatedData: any) {
            const role = await prisma.role.update({
                where: { id: roleId },
                data: updatedData,
            });

            if (!role) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }

            return role;
    }

    static async deleteRole(roleId: string) {
            const role = await prisma.role.delete({
                where: { id: roleId },
            });

            if (!role) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }

            return role;
    }

    static async addRoleToEmployee(employeeId: string, roleId: string) {
            const employeeExists = await prisma.employee.findUnique({
                where: { id: employeeId },
            });
    
            if (!employeeExists) {
                const err = new Error('Employee not found') as any;
                err.status = 404;
                throw err;
            }
    
            const roleExists = await prisma.role.findUnique({
                where: { id: roleId },
            });
    
            if (!roleExists) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }
    
            const updatedEmployee = await prisma.employee.update({
                where: { id: employeeId },
                data: { roleId },
                include: { role: true },
            });
    
            await prisma.employeeRole.create({
                data: {
                    employeeId,
                    roleId,
                },
            });
    
            return updatedEmployee;
    }

    static async getEmployeeRoles(employeeId: string) {
            return await prisma.employeeRole.findMany({
                where: { employeeId },
                include: {
                    role: true,
                },
            });
    }

    static async updateEmployeeRoles(employeeId: string, roleId: string, newRoleId: string) {
            const existingRole = await prisma.employeeRole.findFirst({
                where: { employeeId, roleId },
            });
    
            if (!existingRole) {
                const err = new Error('Role not found for this employee') as any;
                err.status = 404;
                throw err;
            }
    
            return await prisma.employeeRole.update({
                where: {
                    id: existingRole.employeeId,
                },
                data: {
                    roleId: newRoleId,
                },
                include: {
                    role: true,
                },
            });
    }

    static async removeRoleFromEmployee(employeeId: string, roleId: string) {
            const deleted = await prisma.employeeRole.deleteMany({
                where: { employeeId, roleId },
            });

            if (deleted.count === 0) {
                const err = new Error('Role not found for this employee') as any;
                err.status = 404;
                throw err;
            }

            return true;
    }
}

export default Employee;
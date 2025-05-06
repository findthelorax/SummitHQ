import { prisma } from '../config/database';

class Employee {
    static async create(employeeData: any) {
        try {
            const lastEmployee = await prisma.employee.findFirst({
                orderBy: { employeeIDNumber: 'desc' },
            });

            const newEmployeeIDNumber = lastEmployee
                ? lastEmployee.employeeIDNumber + 1
                : 30000;

            return await prisma.employee.create({
                data: {
                    ...employeeData,
                    employeeIDNumber: newEmployeeIDNumber,
                },
            });
        } catch (error) {
            const err = new Error('Failed to create employee') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async assignToMountain(employeeID: string, mountainID: string) {
        try {
            if (!employeeID || !mountainID) {
                const err = new Error('Both employeeID and mountainID are required') as any;
                err.status = 400;
                throw err;
            }

            return await prisma.employeeMountainAssignment.create({
                data: {
                    employeeID,
                    mountainID,
                },
            });
        } catch (error) {
            const err = new Error('Failed to assign employee to mountain') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async findById(id: string) {
        try {
            if (!id) {
                const err = new Error('Employee ID is required') as any;
                err.status = 400;
                throw err;
            }

            const employee = await prisma.employee.findUnique({
                where: { id },
            });

            if (!employee) {
                const err = new Error('Employee not found') as any;
                err.status = 404;
                throw err;
            }

            return employee;
        } catch (error) {
            const err = new Error('Failed to find employee') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async findAll() {
        try {
            return await prisma.employee.findMany();
        } catch (error) {
            const err = new Error('Failed to fetch employees') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async update(id: string, updatedData: any) {
        try {
            return await prisma.employee.update({
                where: { id },
                data: updatedData,
            });
        } catch (error) {
            const err = new Error('Failed to update employee') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async delete(id: string) {
        try {
            return await prisma.employee.delete({
                where: { id },
            });
        } catch (error) {
            const err = new Error('Failed to delete employee') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async createRole(roleData: any) {
        try {
            return await prisma.role.create({
                data: roleData,
            });
        } catch (error) {
            const err = new Error('Failed to create role') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async getAllRoles() {
        try {
            return await prisma.role.findMany();
        } catch (error) {
            const err = new Error('Failed to fetch roles') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async getRoleById(roleID: string) {
        try {
            const role = await prisma.role.findUnique({
                where: { id: roleID },
            });

            if (!role) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }

            return role;
        } catch (error) {
            const err = new Error('Failed to fetch role') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async updateRole(roleID: string, updatedData: any) {
        try {
            const role = await prisma.role.update({
                where: { id: roleID },
                data: updatedData,
            });

            if (!role) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }

            return role;
        } catch (error) {
            const err = new Error('Failed to update role') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async deleteRole(roleID: string) {
        try {
            const role = await prisma.role.delete({
                where: { id: roleID },
            });

            if (!role) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }

            return role;
        } catch (error) {
            const err = new Error('Failed to delete role') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async addRoleToEmployee(employeeID: string, roleID: string) {
        try {
            const employeeExists = await prisma.employee.findUnique({
                where: { id: employeeID },
            });
    
            if (!employeeExists) {
                const err = new Error('Employee not found') as any;
                err.status = 404;
                throw err;
            }
    
            const roleExists = await prisma.role.findUnique({
                where: { id: roleID },
            });
    
            if (!roleExists) {
                const err = new Error('Role not found') as any;
                err.status = 404;
                throw err;
            }
    
            const updatedEmployee = await prisma.employee.update({
                where: { id: employeeID },
                data: { roleID },
                include: { role: true },
            });
    
            await prisma.employeeRole.create({
                data: {
                    employeeID,
                    roleID,
                },
            });
    
            return updatedEmployee;
        } catch (error) {
            const err = new Error('Failed to add role to employee') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async getEmployeeRoles(employeeID: string) {
        try {
            return await prisma.employeeRole.findMany({
                where: { employeeID },
                include: {
                    role: true,
                },
            });
        } catch (error) {
            const err = new Error('Failed to fetch employee roles') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async updateEmployeeRoles(employeeID: string, roleID: string, newRoleID: string) {
        try {
            const existingRole = await prisma.employeeRole.findFirst({
                where: { employeeID, roleID },
            });
    
            if (!existingRole) {
                const err = new Error('Role not found for this employee') as any;
                err.status = 404;
                throw err;
            }
    
            return await prisma.employeeRole.update({
                where: {
                    id: existingRole.id,
                },
                data: {
                    roleID: newRoleID,
                },
                include: {
                    role: true,
                },
            });
        } catch (error) {
            const err = new Error('Failed to update employee role') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }

    static async removeRoleFromEmployee(employeeID: string, roleID: string) {
        try {
            const deleted = await prisma.employeeRole.deleteMany({
                where: { employeeID, roleID },
            });

            if (deleted.count === 0) {
                const err = new Error('Role not found for this employee') as any;
                err.status = 404;
                throw err;
            }

            return true;
        } catch (error) {
            const err = new Error('Failed to remove role from employee') as any;
            err.status = 500;
            err.message = error instanceof Error ? error.message : 'Unknown error occurred';
            throw err;
        }
    }
}

export default Employee;
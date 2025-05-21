import { prisma } from '../../config/database.js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

class Employee {
    
    static async create(employeeData: any) {
        const { phoneNumber, ...rest } = employeeData;
    
        const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
    
        if (!phoneNumberObj || !phoneNumberObj.isValid()) {
            throw new Error('Invalid phone number');
        }
    
        const normalizedPhoneNumber = phoneNumberObj.format('E.164');
    
        const lastEmployee = await prisma.employee.findFirst({
            orderBy: { employeeIdNumber: 'desc' },
        });
    
        const newEmployeeIdNumber = lastEmployee
            ? lastEmployee.employeeIdNumber + 1
            : 30000;
    
        return await prisma.employee.create({
            data: {
                ...rest,
                phoneNumber: normalizedPhoneNumber,
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
            include: {
                role: true,
                additionalRoles: {
                    include: {
                        role: true,
                    },
                },
                mountainAssignments: true,
                dispatcherAssignments: true,
                incidents: true,
                aidRoomChecks: true,
                hutChecks: true,
                liftChecks: true,
                trailChecks: true,
                equipmentChecks: true,
                equipmentServiceLogs: true,
            },
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
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId },
            include: {
                role: true,
                additionalRoles: true,
            },
        });
    
        if (!employee) {
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
    
        if (!employee.roleId) {
            const updatedEmployee = await prisma.employee.update({
                where: { id: employeeId },
                data: { roleId },
                include: { role: true },
            });
    
            return updatedEmployee;
        }
    
        const isRoleInAdditionalRoles = employee.additionalRoles.some(
            (additionalRole) => additionalRole.roleId === roleId
        );
    
        if (isRoleInAdditionalRoles) {
            const err = new Error('Role is already assigned as an additional role') as any;
            err.status = 400;
            throw err;
        }
    
        const newAdditionalRole = await prisma.employeeRole.create({
            data: {
                employeeId,
                roleId,
            },
        });
    
        return newAdditionalRole;
    }

    static async getEmployeeRoles(employeeId: string) {
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId },
            include: {
                role: true,
                additionalRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    
        if (!employee) {
            const err = new Error('Employee not found') as any;
            err.status = 404;
            throw err;
        }
    
        const roles = [];
    
        if (employee.role) {
            roles.push({
                type: 'Primary',
                ...employee.role,
            });
        }
    
        if (employee.additionalRoles.length > 0) {
            employee.additionalRoles.forEach((additionalRole) => {
                roles.push({
                    type: 'Additional',
                    ...additionalRole.role,
                });
            });
        }
    
        return roles;
    }

    static async updateEmployeeRoles(employeeId: string, roleId: string, newRoleId: string) {
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId },
            include: {
                role: true,
                additionalRoles: true,
            },
        });
    
        if (!employee) {
            const err = new Error('Employee not found') as any;
            err.status = 404;
            throw err;
        }
    
        if (employee.roleId === roleId) {
            const updatedEmployee = await prisma.employee.update({
                where: { id: employeeId },
                data: { roleId: newRoleId },
                include: { role: true },
            });
    
            return {
                message: 'Primary role updated successfully',
                employee: updatedEmployee,
            };
        }
    
        const additionalRole = employee.additionalRoles.find(
            (additionalRole) => additionalRole.roleId === roleId
        );
    
        if (!additionalRole) {
            const err = new Error('Role not found for this employee') as any;
            err.status = 404;
            throw err;
        }
    
        const updatedAdditionalRole = await prisma.employeeRole.update({
            where: { id: additionalRole.id },
            data: { roleId: newRoleId },
        });
    
        return {
            message: 'Additional role updated successfully',
            updatedRole: updatedAdditionalRole,
        };
    }

    static async removeRoleFromEmployee(employeeId: string, roleId: string) {
        const employee = await prisma.employee.findUnique({
            where: { id: employeeId },
            include: {
                role: true,
                additionalRoles: true,
            },
        });
    
        if (!employee) {
            const err = new Error('Employee not found') as any;
            err.status = 404;
            throw err;
        }
    
        if (employee.roleId === roleId) {
            const updatedEmployee = await prisma.employee.update({
                where: { id: employeeId },
                data: { roleId: null },
            });
    
            return {
                message: 'Primary role removed successfully',
                employee: updatedEmployee,
            };
        }
    
        const additionalRole = employee.additionalRoles.find(
            (additionalRole) => additionalRole.roleId === roleId
        );
    
        if (!additionalRole) {
            const err = new Error('Role not found for this employee') as any;
            err.status = 404;
            throw err;
        }
    
        await prisma.employeeRole.delete({
            where: { id: additionalRole.id },
        });
    
        return { message: 'Additional role removed successfully' };
    }
}

export default Employee;
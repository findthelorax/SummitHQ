import { prisma } from '../../config/database.js';
import { normalizePhoneNumber } from '../../utils/parsePhoneNumberFromString.js';
import { generateNextEmployeeIdNumber } from '../../utils/getNextEmployeeIdNumber.js';
import { capitalizeWords } from '../../utils/capitalizeWords.js';

class Employee {
	static async create(employeeData: any) {
		const { phoneNumber, roleId, mountainId, ...rest } = employeeData;
		let normalizedPhoneNumber: string | null = null;
		if (phoneNumber && phoneNumber.trim() !== '') {
			normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);
		}

		if (rest.firstName) rest.firstName = capitalizeWords(rest.firstName);
		if (rest.lastName) rest.lastName = capitalizeWords(rest.lastName);

		const data: any = {
			...rest,
			phoneNumber: normalizedPhoneNumber,
		};
		
		if (roleId && typeof roleId === 'string' && roleId.trim() !== '') {
			data.roleId = roleId;
		} else {
			data.roleId = null;
		}

		let retries = 3;
		while (retries > 0) {
			try {
				const employee = await prisma.$transaction(async (tx) => {
					const newEmployeeIdNumber = await generateNextEmployeeIdNumber(tx, rest.department);
					return await tx.employee.create({
						data: {
							...data,
							employeeIdNumber: newEmployeeIdNumber,
						},
					});
				});
				if (mountainId) {
					await Employee.assignToMountain(employee.id, mountainId);
				}
				return employee;
			} catch (err: any) {
				if (err.code === 'P2002' && err.meta?.target?.includes('employeeIdNumber')) {
					retries--;
					if (retries === 0)
						throw new Error('Could not generate unique employee number after several attempts.');
				} else {
					throw err;
				}
			}
		}
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
		const employees = await prisma.employee.findMany({
			include: {
				role: true,
				certifications: true,
				additionalRoles: true,
				mountainAssignments: {
					include: {
						mountain: true,
					},
				},
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

		if (!employees) {
			const err = new Error('Employees not found') as any;
			err.status = 404;
			throw err;
		}

		return employees;
	}

	static async findAllByMountain(mountainId: string) {
		return await prisma.employee.findMany({
			where: {
				mountainAssignments: {
					some: { mountainId },
				},
			},
			include: {
				role: true,
				certifications: true,
				additionalRoles: true,
				mountainAssignments: {
					include: { mountain: true },
				},
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

		const additionalRole = employee.additionalRoles.find((additionalRole) => additionalRole.roleId === roleId);

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

		const additionalRole = employee.additionalRoles.find((additionalRole) => additionalRole.roleId === roleId);

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

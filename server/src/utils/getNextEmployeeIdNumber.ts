import { PrismaClient } from '../generated/prisma/index.js';

const DEPARTMENT_PREFIX: Record<string, number> = {
    PATROL: 10,
    LIFT_OPS: 20,
    MAINTENANCE: 30,
    ADMIN: 40,
    OTHER: 90,
};

export async function generateNextEmployeeIdNumber(
    tx: Pick<PrismaClient, 'employee'>, // <-- Accepts both PrismaClient and transaction client
    primaryDepartment: string
): Promise<number> {
    const prefix = DEPARTMENT_PREFIX[primaryDepartment] ?? DEPARTMENT_PREFIX.OTHER;
    const minNumber = prefix * 1;
    const maxNumber = (prefix + 1) * 100 - 1;

    // Fast path: just increment the max
    const lastEmployee = await tx.employee.findFirst({
        where: {
            employeeIdNumber: { gte: minNumber, lte: maxNumber },
        },
        orderBy: { employeeIdNumber: 'desc' },
        select: { employeeIdNumber: true },
    });

    let newEmployeeIdNumber = lastEmployee
        ? (lastEmployee.employeeIdNumber ?? minNumber - 1) + 1
        : minNumber;

    if (newEmployeeIdNumber <= maxNumber) {
        return newEmployeeIdNumber;
    }

    // Slow path: range is full, fill the lowest available gap
    const employees = await tx.employee.findMany({
        where: {
            employeeIdNumber: { gte: minNumber, lte: maxNumber },
        },
        orderBy: { employeeIdNumber: 'asc' },
        select: { employeeIdNumber: true },
    });

    let expected = minNumber;
    for (const emp of employees) {
        if (emp.employeeIdNumber !== expected) {
            return expected;
        }
        expected++;
    }

    throw new Error('Employee ID range for this department is full.');
}
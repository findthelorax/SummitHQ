import { PrismaClient } from '@prisma/client';

const DEPARTMENT_PREFIX: Record<string, number> = {
    PATROL: 100,
    LIFT_OPS: 200,
    MAINTENANCE: 300,
    ADMIN: 400,
    OTHER: 900,
};

export async function generateNextEmployeeIdNumber(
    tx: PrismaClient,
    department: string
): Promise<number> {
    const prefix = DEPARTMENT_PREFIX[department] ?? DEPARTMENT_PREFIX.OTHER;
    const minNumber = prefix * 1000; // e.g., 101000
    const maxNumber = (prefix + 1) * 1000 - 1; // e.g., 101999

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
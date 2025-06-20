-- DropForeignKey
ALTER TABLE "DispatcherAssignment" DROP CONSTRAINT "DispatcherAssignment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeMountainAssignment" DROP CONSTRAINT "EmployeeMountainAssignment_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "EmployeeMountainAssignment" ADD CONSTRAINT "EmployeeMountainAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispatcherAssignment" ADD CONSTRAINT "DispatcherAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

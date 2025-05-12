/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,mountainId,assignedAt]` on the table `DispatcherAssignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId,mountainId]` on the table `EmployeeMountainAssignment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DispatcherAssignment" ALTER COLUMN "assignedAt" DROP DEFAULT,
ALTER COLUMN "assignedAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "EmployeeMountainAssignment" ALTER COLUMN "assignedAt" DROP DEFAULT,
ALTER COLUMN "assignedAt" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "DispatcherAssignment_employeeId_mountainId_assignedAt_key" ON "DispatcherAssignment"("employeeId", "mountainId", "assignedAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeMountainAssignment_employeeId_mountainId_key" ON "EmployeeMountainAssignment"("employeeId", "mountainId");

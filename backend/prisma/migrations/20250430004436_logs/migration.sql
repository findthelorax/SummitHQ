/*
  Warnings:

  - You are about to drop the column `mountainId` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,mountainId]` on the table `AidRoom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `AidRoomCheck` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `EquipmentCheck` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `EquipmentServiceLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `Hut` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `HutCheck` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `Incident` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `IncidentLog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `IncidentLogEquipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `Lift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `LiftCheck` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `Lodge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `Trail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,mountainId]` on the table `TrailCheck` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mountainId` to the `EquipmentServiceLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_mountainId_fkey";

-- DropIndex
DROP INDEX "Employee_mountainId_idx";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "mountainId";

-- AlterTable
ALTER TABLE "EquipmentServiceLog" ADD COLUMN     "mountainId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "EmployeeMountainAssignment" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeMountainAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmployeeMountainAssignment_mountainId_idx" ON "EmployeeMountainAssignment"("mountainId");

-- CreateIndex
CREATE INDEX "EmployeeMountainAssignment_employeeId_idx" ON "EmployeeMountainAssignment"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeMountainAssignment_employeeId_mountainId_key" ON "EmployeeMountainAssignment"("employeeId", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "AidRoom_id_mountainId_key" ON "AidRoom"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "AidRoomCheck_id_mountainId_key" ON "AidRoomCheck"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_id_mountainId_key" ON "Equipment"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentCheck_id_mountainId_key" ON "EquipmentCheck"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentServiceLog_id_mountainId_key" ON "EquipmentServiceLog"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Hut_id_mountainId_key" ON "Hut"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "HutCheck_id_mountainId_key" ON "HutCheck"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Incident_id_mountainId_key" ON "Incident"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "IncidentLog_id_mountainId_key" ON "IncidentLog"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "IncidentLogEquipment_id_mountainId_key" ON "IncidentLogEquipment"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Lift_id_mountainId_key" ON "Lift"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "LiftCheck_id_mountainId_key" ON "LiftCheck"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Lodge_id_mountainId_key" ON "Lodge"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Trail_id_mountainId_key" ON "Trail"("id", "mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "TrailCheck_id_mountainId_key" ON "TrailCheck"("id", "mountainId");

-- AddForeignKey
ALTER TABLE "EmployeeMountainAssignment" ADD CONSTRAINT "EmployeeMountainAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeMountainAssignment" ADD CONSTRAINT "EmployeeMountainAssignment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `mountainId` on the `AidRoom` table. All the data in the column will be lost.
  - You are about to drop the column `aidRoomId` on the `AidRoomCheck` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `AidRoomCheck` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `AidRoomCheck` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `DispatcherAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `DispatcherAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `employeeIdNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `EmployeeMountainAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `EmployeeMountainAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `EmployeeRole` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `EmployeeRole` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `EquipmentCheck` table. All the data in the column will be lost.
  - You are about to drop the column `equipmentId` on the `EquipmentCheck` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `EquipmentCheck` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `EquipmentServiceLog` table. All the data in the column will be lost.
  - You are about to drop the column `equipmentId` on the `EquipmentServiceLog` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `EquipmentServiceLog` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Hut` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `HutCheck` table. All the data in the column will be lost.
  - You are about to drop the column `hutId` on the `HutCheck` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `HutCheck` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `equipmentId` on the `IncidentEquipmentUseageLog` table. All the data in the column will be lost.
  - You are about to drop the column `incidentId` on the `IncidentEquipmentUseageLog` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `IncidentEquipmentUseageLog` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Lift` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `LiftCheck` table. All the data in the column will be lost.
  - You are about to drop the column `liftId` on the `LiftCheck` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `LiftCheck` table. All the data in the column will be lost.
  - You are about to drop the column `areaId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Lodge` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Trail` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `TrailCheck` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `TrailCheck` table. All the data in the column will be lost.
  - You are about to drop the column `trailId` on the `TrailCheck` table. All the data in the column will be lost.
  - You are about to drop the column `mountainId` on the `Weather` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mountainID,name]` on the table `AidRoom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeIDNumber]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeID,roleID]` on the table `EmployeeRole` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mountainID,number]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationID,dayOfWeek,date]` on the table `Hours` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mountainID,name]` on the table `Hut` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mountainID,name]` on the table `Lift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mountainID,name]` on the table `Lodge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mountainID,name]` on the table `Trail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mountainID` to the `AidRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aidRoomID` to the `AidRoomCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `AidRoomCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `AidRoomCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Area` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `DispatcherAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `DispatcherAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeIDNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `EmployeeMountainAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `EmployeeMountainAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `EmployeeRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleID` to the `EmployeeRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `EquipmentCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipmentID` to the `EquipmentCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `EquipmentCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipmentID` to the `EquipmentServiceLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `EquipmentServiceLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationID` to the `Hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Hut` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `HutCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hutID` to the `HutCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `HutCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationID` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipmentID` to the `IncidentEquipmentUseageLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentID` to the `IncidentEquipmentUseageLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `IncidentEquipmentUseageLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Lift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `LiftCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liftID` to the `LiftCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `LiftCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Lodge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Trail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeID` to the `TrailCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `TrailCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailID` to the `TrailCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mountainID` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AidRoom" DROP CONSTRAINT "AidRoom_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "AidRoomCheck" DROP CONSTRAINT "AidRoomCheck_aidRoomId_fkey";

-- DropForeignKey
ALTER TABLE "AidRoomCheck" DROP CONSTRAINT "AidRoomCheck_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "AidRoomCheck" DROP CONSTRAINT "AidRoomCheck_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "DispatcherAssignment" DROP CONSTRAINT "DispatcherAssignment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "DispatcherAssignment" DROP CONSTRAINT "DispatcherAssignment_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_roleId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeMountainAssignment" DROP CONSTRAINT "EmployeeMountainAssignment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeMountainAssignment" DROP CONSTRAINT "EmployeeMountainAssignment_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeRole" DROP CONSTRAINT "EmployeeRole_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeRole" DROP CONSTRAINT "EmployeeRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentCheck" DROP CONSTRAINT "EquipmentCheck_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentCheck" DROP CONSTRAINT "EquipmentCheck_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentCheck" DROP CONSTRAINT "EquipmentCheck_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentServiceLog" DROP CONSTRAINT "EquipmentServiceLog_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentServiceLog" DROP CONSTRAINT "EquipmentServiceLog_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentServiceLog" DROP CONSTRAINT "EquipmentServiceLog_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Hours" DROP CONSTRAINT "Hours_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Hut" DROP CONSTRAINT "Hut_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "HutCheck" DROP CONSTRAINT "HutCheck_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "HutCheck" DROP CONSTRAINT "HutCheck_hutId_fkey";

-- DropForeignKey
ALTER TABLE "HutCheck" DROP CONSTRAINT "HutCheck_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" DROP CONSTRAINT "IncidentEquipmentUseageLog_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" DROP CONSTRAINT "IncidentEquipmentUseageLog_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" DROP CONSTRAINT "IncidentEquipmentUseageLog_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Lift" DROP CONSTRAINT "Lift_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "LiftCheck" DROP CONSTRAINT "LiftCheck_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "LiftCheck" DROP CONSTRAINT "LiftCheck_liftId_fkey";

-- DropForeignKey
ALTER TABLE "LiftCheck" DROP CONSTRAINT "LiftCheck_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_areaId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Lodge" DROP CONSTRAINT "Lodge_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "Trail" DROP CONSTRAINT "Trail_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "TrailCheck" DROP CONSTRAINT "TrailCheck_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "TrailCheck" DROP CONSTRAINT "TrailCheck_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "TrailCheck" DROP CONSTRAINT "TrailCheck_trailId_fkey";

-- DropForeignKey
ALTER TABLE "Weather" DROP CONSTRAINT "Weather_mountainId_fkey";

-- DropIndex
DROP INDEX "AidRoom_mountainId_idx";

-- DropIndex
DROP INDEX "AidRoom_mountainId_name_key";

-- DropIndex
DROP INDEX "AidRoomCheck_aidRoomId_createdAt_idx";

-- DropIndex
DROP INDEX "AidRoomCheck_aidRoomId_idx";

-- DropIndex
DROP INDEX "AidRoomCheck_mountainId_createdAt_idx";

-- DropIndex
DROP INDEX "AidRoomCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "Area_mountainId_idx";

-- DropIndex
DROP INDEX "DispatcherAssignment_employeeId_idx";

-- DropIndex
DROP INDEX "DispatcherAssignment_mountainId_idx";

-- DropIndex
DROP INDEX "Employee_employeeIdNumber_key";

-- DropIndex
DROP INDEX "EmployeeMountainAssignment_employeeId_idx";

-- DropIndex
DROP INDEX "EmployeeMountainAssignment_mountainId_idx";

-- DropIndex
DROP INDEX "EmployeeRole_employeeId_roleId_key";

-- DropIndex
DROP INDEX "Equipment_mountainId_locationId_idx";

-- DropIndex
DROP INDEX "Equipment_mountainId_number_key";

-- DropIndex
DROP INDEX "EquipmentCheck_equipmentId_createdAt_idx";

-- DropIndex
DROP INDEX "EquipmentCheck_equipmentId_idx";

-- DropIndex
DROP INDEX "EquipmentCheck_mountainId_createdAt_idx";

-- DropIndex
DROP INDEX "EquipmentCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "EquipmentServiceLog_mountainId_equipmentId_idx";

-- DropIndex
DROP INDEX "Hours_locationId_dayOfWeek_date_key";

-- DropIndex
DROP INDEX "Hut_mountainId_idx";

-- DropIndex
DROP INDEX "Hut_mountainId_name_key";

-- DropIndex
DROP INDEX "HutCheck_hutId_createdAt_idx";

-- DropIndex
DROP INDEX "HutCheck_hutId_idx";

-- DropIndex
DROP INDEX "HutCheck_mountainId_createdAt_idx";

-- DropIndex
DROP INDEX "HutCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "Incident_locationId_startTime_idx";

-- DropIndex
DROP INDEX "Incident_mountainId_employeeId_idx";

-- DropIndex
DROP INDEX "Incident_mountainId_id_startTime_idx";

-- DropIndex
DROP INDEX "Incident_mountainId_locationId_idx";

-- DropIndex
DROP INDEX "Incident_mountainId_startTime_idx";

-- DropIndex
DROP INDEX "IncidentEquipmentUseageLog_mountainId_equipmentId_idx";

-- DropIndex
DROP INDEX "IncidentEquipmentUseageLog_mountainId_incidentId_idx";

-- DropIndex
DROP INDEX "IncidentEquipmentUseageLog_mountainId_usedAt_idx";

-- DropIndex
DROP INDEX "Lift_mountainId_idx";

-- DropIndex
DROP INDEX "Lift_mountainId_name_key";

-- DropIndex
DROP INDEX "LiftCheck_liftId_createdAt_idx";

-- DropIndex
DROP INDEX "LiftCheck_liftId_idx";

-- DropIndex
DROP INDEX "LiftCheck_mountainId_createdAt_idx";

-- DropIndex
DROP INDEX "LiftCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "Location_areaId_idx";

-- DropIndex
DROP INDEX "Location_mountainId_areaId_entityType_idx";

-- DropIndex
DROP INDEX "Location_mountainId_entityType_idx";

-- DropIndex
DROP INDEX "Lodge_mountainId_idx";

-- DropIndex
DROP INDEX "Lodge_mountainId_name_key";

-- DropIndex
DROP INDEX "Trail_mountainId_idx";

-- DropIndex
DROP INDEX "Trail_mountainId_name_key";

-- DropIndex
DROP INDEX "TrailCheck_mountainId_createdAt_idx";

-- DropIndex
DROP INDEX "TrailCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "TrailCheck_trailId_createdAt_idx";

-- DropIndex
DROP INDEX "TrailCheck_trailId_idx";

-- AlterTable
ALTER TABLE "AidRoom" DROP COLUMN "mountainId",
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AidRoomCheck" DROP COLUMN "aidRoomId",
DROP COLUMN "employeeId",
DROP COLUMN "mountainId",
ADD COLUMN     "aidRoomID" TEXT NOT NULL,
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Area" DROP COLUMN "mountainId",
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DispatcherAssignment" DROP COLUMN "employeeId",
DROP COLUMN "mountainId",
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "employeeIdNumber",
DROP COLUMN "roleId",
ADD COLUMN     "employeeIDNumber" INTEGER NOT NULL,
ADD COLUMN     "roleID" TEXT;

-- AlterTable
ALTER TABLE "EmployeeMountainAssignment" DROP COLUMN "employeeId",
DROP COLUMN "mountainId",
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeRole" DROP COLUMN "employeeId",
DROP COLUMN "roleId",
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "roleID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "locationId",
DROP COLUMN "mountainId",
ADD COLUMN     "locationID" TEXT,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EquipmentCheck" DROP COLUMN "employeeId",
DROP COLUMN "equipmentId",
DROP COLUMN "mountainId",
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "equipmentID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EquipmentServiceLog" DROP COLUMN "employeeId",
DROP COLUMN "equipmentId",
DROP COLUMN "mountainId",
ADD COLUMN     "employeeID" TEXT,
ADD COLUMN     "equipmentID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hours" DROP COLUMN "locationId",
ADD COLUMN     "locationID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hut" DROP COLUMN "mountainId",
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HutCheck" DROP COLUMN "employeeId",
DROP COLUMN "hutId",
DROP COLUMN "mountainId",
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "hutID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "employeeId",
DROP COLUMN "locationId",
DROP COLUMN "mountainId",
ADD COLUMN     "employeeID" TEXT,
ADD COLUMN     "locationID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IncidentEquipmentUseageLog" DROP COLUMN "equipmentId",
DROP COLUMN "incidentId",
DROP COLUMN "mountainId",
ADD COLUMN     "equipmentID" TEXT NOT NULL,
ADD COLUMN     "incidentID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lift" DROP COLUMN "mountainId",
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LiftCheck" DROP COLUMN "employeeId",
DROP COLUMN "liftId",
DROP COLUMN "mountainId",
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "liftID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "areaId",
DROP COLUMN "entityId",
DROP COLUMN "mountainId",
ADD COLUMN     "areaID" TEXT,
ADD COLUMN     "entityID" TEXT,
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lodge" DROP COLUMN "mountainId",
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trail" DROP COLUMN "mountainId",
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrailCheck" DROP COLUMN "employeeId",
DROP COLUMN "mountainId",
DROP COLUMN "trailId",
ADD COLUMN     "employeeID" TEXT NOT NULL,
ADD COLUMN     "mountainID" TEXT NOT NULL,
ADD COLUMN     "trailID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Weather" DROP COLUMN "mountainId",
ADD COLUMN     "mountainID" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "AidRoom_mountainID_idx" ON "AidRoom"("mountainID");

-- CreateIndex
CREATE UNIQUE INDEX "AidRoom_mountainID_name_key" ON "AidRoom"("mountainID", "name");

-- CreateIndex
CREATE INDEX "AidRoomCheck_aidRoomID_idx" ON "AidRoomCheck"("aidRoomID");

-- CreateIndex
CREATE INDEX "AidRoomCheck_mountainID_recordedAt_employeeID_idx" ON "AidRoomCheck"("mountainID", "recordedAt", "employeeID");

-- CreateIndex
CREATE INDEX "AidRoomCheck_mountainID_createdAt_idx" ON "AidRoomCheck"("mountainID", "createdAt");

-- CreateIndex
CREATE INDEX "AidRoomCheck_aidRoomID_createdAt_idx" ON "AidRoomCheck"("aidRoomID", "createdAt");

-- CreateIndex
CREATE INDEX "Area_mountainID_idx" ON "Area"("mountainID");

-- CreateIndex
CREATE INDEX "DispatcherAssignment_employeeID_idx" ON "DispatcherAssignment"("employeeID");

-- CreateIndex
CREATE INDEX "DispatcherAssignment_mountainID_idx" ON "DispatcherAssignment"("mountainID");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeIDNumber_key" ON "Employee"("employeeIDNumber");

-- CreateIndex
CREATE INDEX "EmployeeMountainAssignment_mountainID_idx" ON "EmployeeMountainAssignment"("mountainID");

-- CreateIndex
CREATE INDEX "EmployeeMountainAssignment_employeeID_idx" ON "EmployeeMountainAssignment"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeRole_employeeID_roleID_key" ON "EmployeeRole"("employeeID", "roleID");

-- CreateIndex
CREATE INDEX "Equipment_mountainID_locationID_idx" ON "Equipment"("mountainID", "locationID");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_mountainID_number_key" ON "Equipment"("mountainID", "number");

-- CreateIndex
CREATE INDEX "EquipmentCheck_equipmentID_idx" ON "EquipmentCheck"("equipmentID");

-- CreateIndex
CREATE INDEX "EquipmentCheck_mountainID_recordedAt_employeeID_idx" ON "EquipmentCheck"("mountainID", "recordedAt", "employeeID");

-- CreateIndex
CREATE INDEX "EquipmentCheck_mountainID_createdAt_idx" ON "EquipmentCheck"("mountainID", "createdAt");

-- CreateIndex
CREATE INDEX "EquipmentCheck_equipmentID_createdAt_idx" ON "EquipmentCheck"("equipmentID", "createdAt");

-- CreateIndex
CREATE INDEX "EquipmentServiceLog_mountainID_equipmentID_idx" ON "EquipmentServiceLog"("mountainID", "equipmentID");

-- CreateIndex
CREATE UNIQUE INDEX "Hours_locationID_dayOfWeek_date_key" ON "Hours"("locationID", "dayOfWeek", "date");

-- CreateIndex
CREATE INDEX "Hut_mountainID_idx" ON "Hut"("mountainID");

-- CreateIndex
CREATE UNIQUE INDEX "Hut_mountainID_name_key" ON "Hut"("mountainID", "name");

-- CreateIndex
CREATE INDEX "HutCheck_hutID_idx" ON "HutCheck"("hutID");

-- CreateIndex
CREATE INDEX "HutCheck_mountainID_recordedAt_employeeID_idx" ON "HutCheck"("mountainID", "recordedAt", "employeeID");

-- CreateIndex
CREATE INDEX "HutCheck_mountainID_createdAt_idx" ON "HutCheck"("mountainID", "createdAt");

-- CreateIndex
CREATE INDEX "HutCheck_hutID_createdAt_idx" ON "HutCheck"("hutID", "createdAt");

-- CreateIndex
CREATE INDEX "Incident_mountainID_locationID_idx" ON "Incident"("mountainID", "locationID");

-- CreateIndex
CREATE INDEX "Incident_mountainID_employeeID_idx" ON "Incident"("mountainID", "employeeID");

-- CreateIndex
CREATE INDEX "Incident_mountainID_id_startTime_idx" ON "Incident"("mountainID", "id", "startTime");

-- CreateIndex
CREATE INDEX "Incident_mountainID_startTime_idx" ON "Incident"("mountainID", "startTime");

-- CreateIndex
CREATE INDEX "Incident_locationID_startTime_idx" ON "Incident"("locationID", "startTime");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUseageLog_mountainID_incidentID_idx" ON "IncidentEquipmentUseageLog"("mountainID", "incidentID");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUseageLog_mountainID_equipmentID_idx" ON "IncidentEquipmentUseageLog"("mountainID", "equipmentID");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUseageLog_mountainID_usedAt_idx" ON "IncidentEquipmentUseageLog"("mountainID", "usedAt");

-- CreateIndex
CREATE INDEX "Lift_mountainID_idx" ON "Lift"("mountainID");

-- CreateIndex
CREATE UNIQUE INDEX "Lift_mountainID_name_key" ON "Lift"("mountainID", "name");

-- CreateIndex
CREATE INDEX "LiftCheck_liftID_idx" ON "LiftCheck"("liftID");

-- CreateIndex
CREATE INDEX "LiftCheck_mountainID_recordedAt_employeeID_idx" ON "LiftCheck"("mountainID", "recordedAt", "employeeID");

-- CreateIndex
CREATE INDEX "LiftCheck_mountainID_createdAt_idx" ON "LiftCheck"("mountainID", "createdAt");

-- CreateIndex
CREATE INDEX "LiftCheck_liftID_createdAt_idx" ON "LiftCheck"("liftID", "createdAt");

-- CreateIndex
CREATE INDEX "Location_mountainID_entityType_idx" ON "Location"("mountainID", "entityType");

-- CreateIndex
CREATE INDEX "Location_areaID_idx" ON "Location"("areaID");

-- CreateIndex
CREATE INDEX "Location_mountainID_areaID_entityType_idx" ON "Location"("mountainID", "areaID", "entityType");

-- CreateIndex
CREATE INDEX "Lodge_mountainID_idx" ON "Lodge"("mountainID");

-- CreateIndex
CREATE UNIQUE INDEX "Lodge_mountainID_name_key" ON "Lodge"("mountainID", "name");

-- CreateIndex
CREATE INDEX "Trail_mountainID_idx" ON "Trail"("mountainID");

-- CreateIndex
CREATE UNIQUE INDEX "Trail_mountainID_name_key" ON "Trail"("mountainID", "name");

-- CreateIndex
CREATE INDEX "TrailCheck_trailID_idx" ON "TrailCheck"("trailID");

-- CreateIndex
CREATE INDEX "TrailCheck_mountainID_recordedAt_employeeID_idx" ON "TrailCheck"("mountainID", "recordedAt", "employeeID");

-- CreateIndex
CREATE INDEX "TrailCheck_mountainID_createdAt_idx" ON "TrailCheck"("mountainID", "createdAt");

-- CreateIndex
CREATE INDEX "TrailCheck_trailID_createdAt_idx" ON "TrailCheck"("trailID", "createdAt");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_areaID_fkey" FOREIGN KEY ("areaID") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hours" ADD CONSTRAINT "Hours_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeMountainAssignment" ADD CONSTRAINT "EmployeeMountainAssignment_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeMountainAssignment" ADD CONSTRAINT "EmployeeMountainAssignment_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispatcherAssignment" ADD CONSTRAINT "DispatcherAssignment_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispatcherAssignment" ADD CONSTRAINT "DispatcherAssignment_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRole" ADD CONSTRAINT "EmployeeRole_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRole" ADD CONSTRAINT "EmployeeRole_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lift" ADD CONSTRAINT "Lift_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lodge" ADD CONSTRAINT "Lodge_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hut" ADD CONSTRAINT "Hut_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoom" ADD CONSTRAINT "AidRoom_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_equipmentID_fkey" FOREIGN KEY ("equipmentID") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_locationID_fkey" FOREIGN KEY ("locationID") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" ADD CONSTRAINT "IncidentEquipmentUseageLog_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" ADD CONSTRAINT "IncidentEquipmentUseageLog_incidentID_fkey" FOREIGN KEY ("incidentID") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" ADD CONSTRAINT "IncidentEquipmentUseageLog_equipmentID_fkey" FOREIGN KEY ("equipmentID") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_liftID_fkey" FOREIGN KEY ("liftID") REFERENCES "Lift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_trailID_fkey" FOREIGN KEY ("trailID") REFERENCES "Trail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_hutID_fkey" FOREIGN KEY ("hutID") REFERENCES "Hut"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_aidRoomID_fkey" FOREIGN KEY ("aidRoomID") REFERENCES "AidRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_mountainID_fkey" FOREIGN KEY ("mountainID") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_equipmentID_fkey" FOREIGN KEY ("equipmentID") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

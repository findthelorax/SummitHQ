/*
  Warnings:

  - You are about to drop the column `recordedAt` on the `AidRoomCheck` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `EquipmentCheck` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `HutCheck` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `LiftCheck` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `TrailCheck` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AidRoomCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "EquipmentCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "HutCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "LiftCheck_mountainId_recordedAt_employeeId_idx";

-- DropIndex
DROP INDEX "TrailCheck_mountainId_recordedAt_employeeId_idx";

-- AlterTable
ALTER TABLE "AidRoomCheck" DROP COLUMN "recordedAt";

-- AlterTable
ALTER TABLE "EquipmentCheck" DROP COLUMN "recordedAt";

-- AlterTable
ALTER TABLE "HutCheck" DROP COLUMN "recordedAt";

-- AlterTable
ALTER TABLE "LiftCheck" DROP COLUMN "recordedAt";

-- AlterTable
ALTER TABLE "TrailCheck" DROP COLUMN "recordedAt";

-- CreateIndex
CREATE INDEX "AidRoomCheck_mountainId_createdAt_employeeId_idx" ON "AidRoomCheck"("mountainId", "createdAt", "employeeId");

-- CreateIndex
CREATE INDEX "EquipmentCheck_mountainId_createdAt_employeeId_idx" ON "EquipmentCheck"("mountainId", "createdAt", "employeeId");

-- CreateIndex
CREATE INDEX "HutCheck_mountainId_createdAt_employeeId_idx" ON "HutCheck"("mountainId", "createdAt", "employeeId");

-- CreateIndex
CREATE INDEX "LiftCheck_mountainId_createdAt_employeeId_idx" ON "LiftCheck"("mountainId", "createdAt", "employeeId");

-- CreateIndex
CREATE INDEX "TrailCheck_mountainId_createdAt_employeeId_idx" ON "TrailCheck"("mountainId", "createdAt", "employeeId");

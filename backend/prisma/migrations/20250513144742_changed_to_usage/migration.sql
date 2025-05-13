/*
  Warnings:

  - You are about to drop the `IncidentEquipmentUseageLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" DROP CONSTRAINT "IncidentEquipmentUseageLog_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" DROP CONSTRAINT "IncidentEquipmentUseageLog_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" DROP CONSTRAINT "IncidentEquipmentUseageLog_mountainId_fkey";

-- DropTable
DROP TABLE "IncidentEquipmentUseageLog";

-- CreateTable
CREATE TABLE "IncidentEquipmentUsageLog" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "incidentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncidentEquipmentUsageLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IncidentEquipmentUsageLog_mountainId_incidentId_idx" ON "IncidentEquipmentUsageLog"("mountainId", "incidentId");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUsageLog_mountainId_equipmentId_idx" ON "IncidentEquipmentUsageLog"("mountainId", "equipmentId");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUsageLog_mountainId_usedAt_idx" ON "IncidentEquipmentUsageLog"("mountainId", "usedAt");

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUsageLog" ADD CONSTRAINT "IncidentEquipmentUsageLog_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUsageLog" ADD CONSTRAINT "IncidentEquipmentUsageLog_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUsageLog" ADD CONSTRAINT "IncidentEquipmentUsageLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

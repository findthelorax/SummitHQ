/*
  Warnings:

  - A unique constraint covering the columns `[employeeIdNumber]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeIdNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "employeeIdNumber" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Equipment" ADD COLUMN     "cost" DOUBLE PRECISION,
ADD COLUMN     "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationId" TEXT,
ADD COLUMN     "locationType" "LocationType",
ADD COLUMN     "picture" TEXT;

-- CreateTable
CREATE TABLE "EquipmentServiceLog" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "serviceStatus" "EquipmentService" NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "EquipmentServiceLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EquipmentServiceLog_equipmentId_idx" ON "EquipmentServiceLog"("equipmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeIdNumber_key" ON "Employee"("employeeIdNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Equipment_locationId_locationType_idx" ON "Equipment"("locationId", "locationType");

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "LiftEquipment_fk" FOREIGN KEY ("locationId") REFERENCES "Lift"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "TrailEquipment_fk" FOREIGN KEY ("locationId") REFERENCES "Trail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "LodgeEquipment_fk" FOREIGN KEY ("locationId") REFERENCES "Lodge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "HutEquipment_fk" FOREIGN KEY ("locationId") REFERENCES "Hut"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "AidRoomEquipment_fk" FOREIGN KEY ("locationId") REFERENCES "AidRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

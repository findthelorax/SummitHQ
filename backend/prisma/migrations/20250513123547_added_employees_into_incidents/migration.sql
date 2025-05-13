/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Incident` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_employeeId_fkey";

-- DropIndex
DROP INDEX "Incident_mountainId_employeeId_idx";

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "employeeId";

-- CreateTable
CREATE TABLE "_IncidentEmployees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_IncidentEmployees_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_IncidentEmployees_B_index" ON "_IncidentEmployees"("B");

-- AddForeignKey
ALTER TABLE "_IncidentEmployees" ADD CONSTRAINT "_IncidentEmployees_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IncidentEmployees" ADD CONSTRAINT "_IncidentEmployees_B_fkey" FOREIGN KEY ("B") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

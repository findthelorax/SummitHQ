/*
  Warnings:

  - A unique constraint covering the columns `[mountainId,name,type]` on the table `Lift` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lift_mountainId_name_key";

-- DropIndex
DROP INDEX "Lift_name_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Lift_mountainId_name_type_key" ON "Lift"("mountainId", "name", "type");

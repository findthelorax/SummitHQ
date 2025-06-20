/*
  Warnings:

  - A unique constraint covering the columns `[mountainId,name,type]` on the table `Area` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Area_name_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Area_mountainId_name_type_key" ON "Area"("mountainId", "name", "type");

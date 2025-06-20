/*
  Warnings:

  - A unique constraint covering the columns `[department,title,level]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_department_title_level_key" ON "Role"("department", "title", "level");

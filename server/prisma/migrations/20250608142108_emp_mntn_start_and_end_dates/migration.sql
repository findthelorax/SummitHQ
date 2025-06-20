/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `EmployeeMountainAssignment` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `EmployeeMountainAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `EmployeeMountainAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeMountainAssignment" DROP COLUMN "assignedAt",
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL;

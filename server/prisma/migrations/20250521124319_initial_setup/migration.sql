/*
  Warnings:

  - The values [SURFACE,ROPE,CONVEYOR] on the enum `LIFT_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LIFT_TYPE_new" AS ENUM ('CHAIR', 'GONDOLA', 'T_BAR', 'MAGIC_CARPET', 'ROPE_TOW', 'OTHER');
ALTER TABLE "Lift" ALTER COLUMN "type" TYPE "LIFT_TYPE_new" USING ("type"::text::"LIFT_TYPE_new");
ALTER TYPE "LIFT_TYPE" RENAME TO "LIFT_TYPE_old";
ALTER TYPE "LIFT_TYPE_new" RENAME TO "LIFT_TYPE";
DROP TYPE "LIFT_TYPE_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Lift" DROP CONSTRAINT "Lift_locationId_fkey";

-- AlterTable
ALTER TABLE "Lift" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lift" ADD CONSTRAINT "Lift_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

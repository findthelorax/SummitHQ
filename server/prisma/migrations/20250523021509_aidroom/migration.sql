/*
  Warnings:

  - The values [Aid Room] on the enum `LOCATION_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LOCATION_TYPE_new" AS ENUM ('AIDROOM', 'HUT', 'LODGE', 'LIFT', 'TRAIL', 'MOUNTAIN', 'OTHER');
ALTER TABLE "Location" ALTER COLUMN "entityType" TYPE "LOCATION_TYPE_new" USING ("entityType"::text::"LOCATION_TYPE_new");
ALTER TYPE "LOCATION_TYPE" RENAME TO "LOCATION_TYPE_old";
ALTER TYPE "LOCATION_TYPE_new" RENAME TO "LOCATION_TYPE";
DROP TYPE "LOCATION_TYPE_old";
COMMIT;

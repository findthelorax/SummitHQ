/*
  Warnings:

  - The values [UNKNOWN] on the enum `INCIDENT_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - The values [UNKNOWN] on the enum `STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `latitude` on the `AidRoom` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `AidRoom` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Equipment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Hut` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Hut` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Incident` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Incident` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Lift` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Lift` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Lodge` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Lodge` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Mountain` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Mountain` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `latitude` on the `Trail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.
  - You are about to alter the column `longitude` on the `Trail` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(9,6)`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "INCIDENT_STATUS_new" AS ENUM ('STANDBY', 'REPORTED', 'In Progress', 'RESOLVED');
ALTER TABLE "Incident" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Incident" ALTER COLUMN "status" TYPE "INCIDENT_STATUS_new" USING ("status"::text::"INCIDENT_STATUS_new");
ALTER TYPE "INCIDENT_STATUS" RENAME TO "INCIDENT_STATUS_old";
ALTER TYPE "INCIDENT_STATUS_new" RENAME TO "INCIDENT_STATUS";
DROP TYPE "INCIDENT_STATUS_old";
ALTER TABLE "Incident" ALTER COLUMN "status" SET DEFAULT 'REPORTED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "STATUS_new" AS ENUM ('OPEN', 'CLOSED', 'On Hold');
ALTER TABLE "AidRoom" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Hours" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Hut" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lift" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lodge" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Trail" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Hours" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "Lift" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "Trail" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "Lodge" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "Hut" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "AidRoom" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TYPE "STATUS" RENAME TO "STATUS_old";
ALTER TYPE "STATUS_new" RENAME TO "STATUS";
DROP TYPE "STATUS_old";
ALTER TABLE "AidRoom" ALTER COLUMN "status" SET DEFAULT 'CLOSED';
ALTER TABLE "Hours" ALTER COLUMN "status" SET DEFAULT 'OPEN';
ALTER TABLE "Hut" ALTER COLUMN "status" SET DEFAULT 'CLOSED';
ALTER TABLE "Lift" ALTER COLUMN "status" SET DEFAULT 'CLOSED';
ALTER TABLE "Lodge" ALTER COLUMN "status" SET DEFAULT 'CLOSED';
ALTER TABLE "Trail" ALTER COLUMN "status" SET DEFAULT 'CLOSED';
COMMIT;

-- AlterTable
ALTER TABLE "AidRoom" ALTER COLUMN "status" SET DEFAULT 'CLOSED',
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6);

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6);

-- AlterTable
ALTER TABLE "Hut" ALTER COLUMN "status" SET DEFAULT 'CLOSED',
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6);

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6);

-- AlterTable
ALTER TABLE "Lift" ALTER COLUMN "status" SET DEFAULT 'CLOSED',
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6);

-- AlterTable
ALTER TABLE "Lodge" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "status" SET DEFAULT 'CLOSED';

-- AlterTable
ALTER TABLE "Mountain" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "openingDate" SET DATA TYPE DATE,
ALTER COLUMN "closingDate" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Trail" ALTER COLUMN "status" SET DEFAULT 'CLOSED',
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(9,6);

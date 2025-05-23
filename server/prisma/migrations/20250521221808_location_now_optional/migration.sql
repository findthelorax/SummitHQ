-- DropForeignKey
ALTER TABLE "AidRoom" DROP CONSTRAINT "AidRoom_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Hut" DROP CONSTRAINT "Hut_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Lodge" DROP CONSTRAINT "Lodge_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Trail" DROP CONSTRAINT "Trail_locationId_fkey";

-- AlterTable
ALTER TABLE "AidRoom" ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Hut" ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lodge" ALTER COLUMN "locationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trail" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lodge" ADD CONSTRAINT "Lodge_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hut" ADD CONSTRAINT "Hut_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoom" ADD CONSTRAINT "AidRoom_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_locationId_fkey";

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

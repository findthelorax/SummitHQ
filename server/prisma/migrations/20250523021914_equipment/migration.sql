-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_mountainId_fkey";

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "mountainId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

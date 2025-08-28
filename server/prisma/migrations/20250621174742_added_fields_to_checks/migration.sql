/*
  Warnings:

  - Added the required column `status` to the `LiftCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `TrailCheck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `TrailCheck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AidRoomCheck" ADD COLUMN     "equipmentIssues" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "equipmentNotes" TEXT,
ADD COLUMN     "paperworkStocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "HutCheck" ADD COLUMN     "equipmentIssues" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "equipmentNotes" TEXT,
ADD COLUMN     "paperworkStocked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "LiftCheck" ADD COLUMN     "hazards" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "TrailCheck" ADD COLUMN     "condition" "TRAIL_CONDITION" NOT NULL,
ADD COLUMN     "hazards" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "snowmaking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "STATUS" NOT NULL;

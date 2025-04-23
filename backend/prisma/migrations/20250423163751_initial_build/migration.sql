-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('PATROL', 'LIFT OPS', 'DISPATCH', 'MAINTENANCE', 'ADMINISTRATION', 'OTHER');

-- CreateEnum
CREATE TYPE "TrailCondition" AS ENUM ('MACHINE GROOMED', 'PACKED POWDER', 'POWDER', 'HARD PACK', 'GROOMED', 'MOGULS', 'CLOSED');

-- CreateEnum
CREATE TYPE "TrailDifficulty" AS ENUM ('GREEN_CIRCLE', 'BLUE_SQUARE', 'BLACK_DIAMOND', 'DOUBLE_BLACK_DIAMOND', 'TERRAIN_PARK', 'RACE_COURSE');

-- CreateEnum
CREATE TYPE "EquipmentService" AS ENUM ('IN_SERVICE', 'OUT_OF_SERVICE', 'NEEDS_INSPECTION', 'PENDING_REPAIR', 'UNDER_MAINTENANCE', 'CLEANING');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('AVAILABLE', 'STANDBY', 'IN_USE', 'RETIRED', 'LOST');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('AID ROOM', 'HUT', 'LODGE', 'TRAIL', 'LIFT', 'OTHER');

-- CreateTable
CREATE TABLE "Mountain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "height" INTEGER NOT NULL,
    "hours" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "openingDate" TIMESTAMP(3),
    "closingDate" TIMESTAMP(3),

    CONSTRAINT "Mountain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "windDirection" TEXT,
    "visibility" DOUBLE PRECISION,
    "conditions" TEXT NOT NULL,
    "snowfall24h" DOUBLE PRECISION,
    "snowfall7d" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DispatcherAssignment" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "DispatcherAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lift" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "Lift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "difficulty" "TrailDifficulty" NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "condition" "TrailCondition" NOT NULL DEFAULT 'CLOSED',
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lodge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "Lodge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hut" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "Hut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AidRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "AidRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "EquipmentStatus" NOT NULL,
    "service" "EquipmentService" NOT NULL,
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNKNOWN',
    "mountainId" TEXT NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncidentLog" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "locationType" "LocationType" NOT NULL,
    "locationId" TEXT NOT NULL,
    "locationStatus" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "onSceneTime" TIMESTAMP(3),
    "stableTime" TIMESTAMP(3),
    "transportTime" TIMESTAMP(3),
    "dryRun" BOOLEAN NOT NULL DEFAULT false,
    "dryRunTime" TIMESTAMP(3),

    CONSTRAINT "IncidentLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncidentLogEquipment" (
    "id" TEXT NOT NULL,
    "incidentLogId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "IncidentLogEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiftCheck" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "liftId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "LiftCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailCheck" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "trailId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "TrailCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HutCheck" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "hutId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "HutCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AidRoomCheck" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "aidRoomId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "AidRoomCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentCheck" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "EquipmentCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mountain_name_key" ON "Mountain"("name");

-- CreateIndex
CREATE INDEX "Employee_mountainId_idx" ON "Employee"("mountainId");

-- CreateIndex
CREATE INDEX "DispatcherAssignment_employeeId_idx" ON "DispatcherAssignment"("employeeId");

-- CreateIndex
CREATE INDEX "DispatcherAssignment_mountainId_idx" ON "DispatcherAssignment"("mountainId");

-- CreateIndex
CREATE INDEX "Lift_mountainId_idx" ON "Lift"("mountainId");

-- CreateIndex
CREATE INDEX "Trail_mountainId_idx" ON "Trail"("mountainId");

-- CreateIndex
CREATE INDEX "Lodge_mountainId_idx" ON "Lodge"("mountainId");

-- CreateIndex
CREATE INDEX "Hut_mountainId_idx" ON "Hut"("mountainId");

-- CreateIndex
CREATE INDEX "AidRoom_mountainId_idx" ON "AidRoom"("mountainId");

-- CreateIndex
CREATE INDEX "Equipment_mountainId_idx" ON "Equipment"("mountainId");

-- CreateIndex
CREATE INDEX "Incident_mountainId_idx" ON "Incident"("mountainId");

-- CreateIndex
CREATE INDEX "IncidentLog_incidentId_idx" ON "IncidentLog"("incidentId");

-- CreateIndex
CREATE INDEX "IncidentLog_employeeId_idx" ON "IncidentLog"("employeeId");

-- CreateIndex
CREATE INDEX "IncidentLog_mountainId_idx" ON "IncidentLog"("mountainId");

-- CreateIndex
CREATE INDEX "IncidentLog_locationId_locationType_idx" ON "IncidentLog"("locationId", "locationType");

-- CreateIndex
CREATE INDEX "IncidentLogEquipment_incidentLogId_idx" ON "IncidentLogEquipment"("incidentLogId");

-- CreateIndex
CREATE INDEX "IncidentLogEquipment_equipmentId_idx" ON "IncidentLogEquipment"("equipmentId");

-- CreateIndex
CREATE INDEX "IncidentLogEquipment_mountainId_idx" ON "IncidentLogEquipment"("mountainId");

-- CreateIndex
CREATE INDEX "LiftCheck_employeeId_idx" ON "LiftCheck"("employeeId");

-- CreateIndex
CREATE INDEX "LiftCheck_mountainId_idx" ON "LiftCheck"("mountainId");

-- CreateIndex
CREATE INDEX "LiftCheck_liftId_idx" ON "LiftCheck"("liftId");

-- CreateIndex
CREATE INDEX "TrailCheck_employeeId_idx" ON "TrailCheck"("employeeId");

-- CreateIndex
CREATE INDEX "TrailCheck_mountainId_idx" ON "TrailCheck"("mountainId");

-- CreateIndex
CREATE INDEX "TrailCheck_trailId_idx" ON "TrailCheck"("trailId");

-- CreateIndex
CREATE INDEX "HutCheck_employeeId_idx" ON "HutCheck"("employeeId");

-- CreateIndex
CREATE INDEX "HutCheck_mountainId_idx" ON "HutCheck"("mountainId");

-- CreateIndex
CREATE INDEX "HutCheck_hutId_idx" ON "HutCheck"("hutId");

-- CreateIndex
CREATE INDEX "AidRoomCheck_employeeId_idx" ON "AidRoomCheck"("employeeId");

-- CreateIndex
CREATE INDEX "AidRoomCheck_mountainId_idx" ON "AidRoomCheck"("mountainId");

-- CreateIndex
CREATE INDEX "AidRoomCheck_aidRoomId_idx" ON "AidRoomCheck"("aidRoomId");

-- CreateIndex
CREATE INDEX "EquipmentCheck_employeeId_idx" ON "EquipmentCheck"("employeeId");

-- CreateIndex
CREATE INDEX "EquipmentCheck_mountainId_idx" ON "EquipmentCheck"("mountainId");

-- CreateIndex
CREATE INDEX "EquipmentCheck_equipmentId_idx" ON "EquipmentCheck"("equipmentId");

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispatcherAssignment" ADD CONSTRAINT "DispatcherAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispatcherAssignment" ADD CONSTRAINT "DispatcherAssignment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lift" ADD CONSTRAINT "Lift_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lodge" ADD CONSTRAINT "Lodge_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hut" ADD CONSTRAINT "Hut_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoom" ADD CONSTRAINT "AidRoom_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "IncidentLog_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "IncidentLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "IncidentLog_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "LiftIncidentLog_fk" FOREIGN KEY ("locationId") REFERENCES "Lift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "TrailIncidentLog_fk" FOREIGN KEY ("locationId") REFERENCES "Trail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "LodgeIncidentLog_fk" FOREIGN KEY ("locationId") REFERENCES "Lodge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "HutIncidentLog_fk" FOREIGN KEY ("locationId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLog" ADD CONSTRAINT "AidRoomIncidentLog_fk" FOREIGN KEY ("locationId") REFERENCES "AidRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLogEquipment" ADD CONSTRAINT "IncidentLogEquipment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLogEquipment" ADD CONSTRAINT "IncidentLogEquipment_incidentLogId_fkey" FOREIGN KEY ("incidentLogId") REFERENCES "IncidentLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentLogEquipment" ADD CONSTRAINT "IncidentLogEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_liftId_fkey" FOREIGN KEY ("liftId") REFERENCES "Lift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "Trail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_hutId_fkey" FOREIGN KEY ("hutId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_aidRoomId_fkey" FOREIGN KEY ("aidRoomId") REFERENCES "AidRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

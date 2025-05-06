-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Aid Room', 'Hut', 'Lodge', 'Lift', 'Trail', 'Mountain', 'Other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Open', 'Closed', 'On Hold', 'Unknown');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('Standby', 'Reported', 'In Progress', 'Resolved', 'Unknown');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('Operational', 'In Service', 'Out Of Service', 'In Use', 'Cleaning', 'Needs Inspection', 'Pending Repair', 'Under Maintenance', 'Lost', 'Damaged', 'Retired', 'Standby');

-- CreateEnum
CREATE TYPE "LiftType" AS ENUM ('Chair', 'Gondola', 'Surface', 'Rope', 'Conveyor', 'Other');

-- CreateEnum
CREATE TYPE "TrailCondition" AS ENUM ('Machine Groomed', 'Hard Pack', 'Packed Powder', 'Powder', 'Moguls', 'Natural', 'Glades', 'Closed');

-- CreateEnum
CREATE TYPE "TrailDifficulty" AS ENUM ('Green Circle', 'Blue Square', 'Black Diamond', 'Double Black Diamond', 'Terrain Park', 'Race Course');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Patrol', 'Lift Operations', 'Dispatch', 'Maintenance', 'Administration', 'Other');

-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('BaseArea', 'MountainArea', 'Summit', 'Other');

-- CreateEnum
CREATE TYPE "EmployeeRoles" AS ENUM ('Supervisor', 'AdvancedPatroller', 'HillChief', 'Specialist', 'Trainer', 'Director');

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AreaType" NOT NULL,
    "description" TEXT,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "areaId" TEXT,
    "entityId" TEXT,
    "entityType" "LocationType" NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hours" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "dayOfWeek" INTEGER,
    "date" TIMESTAMP(3),
    "openTime" TIMESTAMP(3),
    "closeTime" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'Open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mountain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "height" INTEGER NOT NULL,
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
    "snowfallRecent" DOUBLE PRECISION,
    "snowfall24h" DOUBLE PRECISION,
    "snowfall7d" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeMountainAssignment" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeMountainAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DispatcherAssignment" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DispatcherAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "level" INTEGER,
    "permissions" TEXT[],

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeRole" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "EmployeeRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "employeeIdNumber" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roleId" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lift" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "LiftType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Unknown',
    "capacity" INTEGER NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),

    CONSTRAINT "Lift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trail" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "difficulty" "TrailDifficulty" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Unknown',
    "length" DOUBLE PRECISION NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "condition" "TrailCondition" NOT NULL DEFAULT 'Closed',

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lodge" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "status" "Status" NOT NULL DEFAULT 'Unknown',

    CONSTRAINT "Lodge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hut" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Unknown',
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),

    CONSTRAINT "Hut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AidRoom" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Unknown',
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),

    CONSTRAINT "AidRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentServiceLog" (
    "id" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "employeeId" TEXT,
    "status" "EquipmentStatus" NOT NULL DEFAULT 'Operational',
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentServiceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER,
    "description" TEXT,
    "status" "EquipmentStatus" NOT NULL DEFAULT 'Operational',
    "picture" TEXT,
    "cost" DOUBLE PRECISION,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "mountainId" TEXT NOT NULL,
    "locationId" TEXT,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'Reported',
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "employeeId" TEXT,
    "mountainId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "onSceneTime" TIMESTAMP(3),
    "stableTime" TIMESTAMP(3),
    "transportTime" TIMESTAMP(3),
    "emptyRun" BOOLEAN NOT NULL DEFAULT false,
    "emptyRunAt" TIMESTAMP(3),
    "locationId" TEXT NOT NULL,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncidentEquipmentUseageLog" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "incidentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncidentEquipmentUseageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiftCheck" (
    "id" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "liftId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiftCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrailCheck" (
    "id" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "trailId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrailCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HutCheck" (
    "id" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "hutId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HutCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AidRoomCheck" (
    "id" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "aidRoomId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AidRoomCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentCheck" (
    "id" TEXT NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" TEXT NOT NULL,
    "mountainId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Area_mountainId_idx" ON "Area"("mountainId");

-- CreateIndex
CREATE INDEX "Location_entityType_idx" ON "Location"("entityType");

-- CreateIndex
CREATE INDEX "Location_mountainId_entityType_idx" ON "Location"("mountainId", "entityType");

-- CreateIndex
CREATE INDEX "Location_areaId_idx" ON "Location"("areaId");

-- CreateIndex
CREATE INDEX "Location_mountainId_areaId_entityType_idx" ON "Location"("mountainId", "areaId", "entityType");

-- CreateIndex
CREATE UNIQUE INDEX "Hours_locationId_dayOfWeek_date_key" ON "Hours"("locationId", "dayOfWeek", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Mountain_name_key" ON "Mountain"("name");

-- CreateIndex
CREATE INDEX "EmployeeMountainAssignment_mountainId_idx" ON "EmployeeMountainAssignment"("mountainId");

-- CreateIndex
CREATE INDEX "EmployeeMountainAssignment_employeeId_idx" ON "EmployeeMountainAssignment"("employeeId");

-- CreateIndex
CREATE INDEX "DispatcherAssignment_employeeId_idx" ON "DispatcherAssignment"("employeeId");

-- CreateIndex
CREATE INDEX "DispatcherAssignment_mountainId_idx" ON "DispatcherAssignment"("mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_department_name_key" ON "Role"("department", "name");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeRole_employeeId_roleId_key" ON "EmployeeRole"("employeeId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeIdNumber_key" ON "Employee"("employeeIdNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Lift_mountainId_idx" ON "Lift"("mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Lift_name_type_key" ON "Lift"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Lift_mountainId_name_key" ON "Lift"("mountainId", "name");

-- CreateIndex
CREATE INDEX "Trail_mountainId_idx" ON "Trail"("mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Trail_mountainId_name_key" ON "Trail"("mountainId", "name");

-- CreateIndex
CREATE INDEX "Lodge_mountainId_idx" ON "Lodge"("mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Lodge_mountainId_name_key" ON "Lodge"("mountainId", "name");

-- CreateIndex
CREATE INDEX "Hut_mountainId_idx" ON "Hut"("mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "Hut_mountainId_name_key" ON "Hut"("mountainId", "name");

-- CreateIndex
CREATE INDEX "AidRoom_mountainId_idx" ON "AidRoom"("mountainId");

-- CreateIndex
CREATE UNIQUE INDEX "AidRoom_mountainId_name_key" ON "AidRoom"("mountainId", "name");

-- CreateIndex
CREATE INDEX "EquipmentServiceLog_mountainId_equipmentId_idx" ON "EquipmentServiceLog"("mountainId", "equipmentId");

-- CreateIndex
CREATE INDEX "Equipment_mountainId_locationId_idx" ON "Equipment"("mountainId", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_mountainId_number_key" ON "Equipment"("mountainId", "number");

-- CreateIndex
CREATE INDEX "Incident_mountainId_locationId_idx" ON "Incident"("mountainId", "locationId");

-- CreateIndex
CREATE INDEX "Incident_mountainId_employeeId_idx" ON "Incident"("mountainId", "employeeId");

-- CreateIndex
CREATE INDEX "Incident_mountainId_id_startTime_idx" ON "Incident"("mountainId", "id", "startTime");

-- CreateIndex
CREATE INDEX "Incident_mountainId_startTime_idx" ON "Incident"("mountainId", "startTime");

-- CreateIndex
CREATE INDEX "Incident_locationId_startTime_idx" ON "Incident"("locationId", "startTime");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUseageLog_mountainId_incidentId_idx" ON "IncidentEquipmentUseageLog"("mountainId", "incidentId");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUseageLog_mountainId_equipmentId_idx" ON "IncidentEquipmentUseageLog"("mountainId", "equipmentId");

-- CreateIndex
CREATE INDEX "IncidentEquipmentUseageLog_mountainId_usedAt_idx" ON "IncidentEquipmentUseageLog"("mountainId", "usedAt");

-- CreateIndex
CREATE INDEX "LiftCheck_liftId_idx" ON "LiftCheck"("liftId");

-- CreateIndex
CREATE INDEX "LiftCheck_mountainId_recordedAt_employeeId_idx" ON "LiftCheck"("mountainId", "recordedAt", "employeeId");

-- CreateIndex
CREATE INDEX "LiftCheck_mountainId_createdAt_idx" ON "LiftCheck"("mountainId", "createdAt");

-- CreateIndex
CREATE INDEX "LiftCheck_liftId_createdAt_idx" ON "LiftCheck"("liftId", "createdAt");

-- CreateIndex
CREATE INDEX "TrailCheck_trailId_idx" ON "TrailCheck"("trailId");

-- CreateIndex
CREATE INDEX "TrailCheck_mountainId_recordedAt_employeeId_idx" ON "TrailCheck"("mountainId", "recordedAt", "employeeId");

-- CreateIndex
CREATE INDEX "TrailCheck_mountainId_createdAt_idx" ON "TrailCheck"("mountainId", "createdAt");

-- CreateIndex
CREATE INDEX "TrailCheck_trailId_createdAt_idx" ON "TrailCheck"("trailId", "createdAt");

-- CreateIndex
CREATE INDEX "HutCheck_hutId_idx" ON "HutCheck"("hutId");

-- CreateIndex
CREATE INDEX "HutCheck_mountainId_recordedAt_employeeId_idx" ON "HutCheck"("mountainId", "recordedAt", "employeeId");

-- CreateIndex
CREATE INDEX "HutCheck_mountainId_createdAt_idx" ON "HutCheck"("mountainId", "createdAt");

-- CreateIndex
CREATE INDEX "HutCheck_hutId_createdAt_idx" ON "HutCheck"("hutId", "createdAt");

-- CreateIndex
CREATE INDEX "AidRoomCheck_aidRoomId_idx" ON "AidRoomCheck"("aidRoomId");

-- CreateIndex
CREATE INDEX "AidRoomCheck_mountainId_recordedAt_employeeId_idx" ON "AidRoomCheck"("mountainId", "recordedAt", "employeeId");

-- CreateIndex
CREATE INDEX "AidRoomCheck_mountainId_createdAt_idx" ON "AidRoomCheck"("mountainId", "createdAt");

-- CreateIndex
CREATE INDEX "AidRoomCheck_aidRoomId_createdAt_idx" ON "AidRoomCheck"("aidRoomId", "createdAt");

-- CreateIndex
CREATE INDEX "EquipmentCheck_equipmentId_idx" ON "EquipmentCheck"("equipmentId");

-- CreateIndex
CREATE INDEX "EquipmentCheck_mountainId_recordedAt_employeeId_idx" ON "EquipmentCheck"("mountainId", "recordedAt", "employeeId");

-- CreateIndex
CREATE INDEX "EquipmentCheck_mountainId_createdAt_idx" ON "EquipmentCheck"("mountainId", "createdAt");

-- CreateIndex
CREATE INDEX "EquipmentCheck_equipmentId_createdAt_idx" ON "EquipmentCheck"("equipmentId", "createdAt");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hours" ADD CONSTRAINT "Hours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeMountainAssignment" ADD CONSTRAINT "EmployeeMountainAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeMountainAssignment" ADD CONSTRAINT "EmployeeMountainAssignment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispatcherAssignment" ADD CONSTRAINT "DispatcherAssignment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DispatcherAssignment" ADD CONSTRAINT "DispatcherAssignment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRole" ADD CONSTRAINT "EmployeeRole_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRole" ADD CONSTRAINT "EmployeeRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lift" ADD CONSTRAINT "Lift_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trail" ADD CONSTRAINT "Trail_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lodge" ADD CONSTRAINT "Lodge_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hut" ADD CONSTRAINT "Hut_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoom" ADD CONSTRAINT "AidRoom_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentServiceLog" ADD CONSTRAINT "EquipmentServiceLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" ADD CONSTRAINT "IncidentEquipmentUseageLog_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" ADD CONSTRAINT "IncidentEquipmentUseageLog_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEquipmentUseageLog" ADD CONSTRAINT "IncidentEquipmentUseageLog_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiftCheck" ADD CONSTRAINT "LiftCheck_liftId_fkey" FOREIGN KEY ("liftId") REFERENCES "Lift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrailCheck" ADD CONSTRAINT "TrailCheck_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "Trail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HutCheck" ADD CONSTRAINT "HutCheck_hutId_fkey" FOREIGN KEY ("hutId") REFERENCES "Hut"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AidRoomCheck" ADD CONSTRAINT "AidRoomCheck_aidRoomId_fkey" FOREIGN KEY ("aidRoomId") REFERENCES "AidRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentCheck" ADD CONSTRAINT "EquipmentCheck_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

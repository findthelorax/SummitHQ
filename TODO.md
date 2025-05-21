Great! Here’s a clean TypeScript utility function example for your app that, given an array of Location records, loads the correct entity details by checking the entityType and entityId. It uses Prisma client queries dynamically:

import { PrismaClient, LocationType } from '@prisma/client';

const prisma = new PrismaClient();

type LocationWithEntity = {
  location: {
    id: string;
    name: string;
    entityId: string;
    entityType: LocationType;
    // ...other Location fields
  };
  entityDetails: any; // The actual entity object (Lift, Trail, etc.)
};

async function fetchEntitiesForLocations(
  locations: Array<{ id: string; name: string; entityId: string; entityType: LocationType }>
): Promise<LocationWithEntity[]> {
  const results: LocationWithEntity[] = [];

  for (const loc of locations) {
    let entityDetails = null;

    switch (loc.entityType) {
      case 'LIFT':
        entityDetails = await prisma.lift.findUnique({ where: { id: loc.entityId } });
        break;
      case 'TRAIL':
        entityDetails = await prisma.trail.findUnique({ where: { id: loc.entityId } });
        break;
      case 'HUT':
        entityDetails = await prisma.hut.findUnique({ where: { id: loc.entityId } });
        break;
      case 'LODGE':
        entityDetails = await prisma.lodge.findUnique({ where: { id: loc.entityId } });
        break;
      case 'AID_ROOM':
        entityDetails = await prisma.aidRoom.findUnique({ where: { id: loc.entityId } });
        break;
      default:
        // Unknown type, handle accordingly or skip
        entityDetails = null;
    }

    results.push({ location: loc, entityDetails });
  }

  return results;
}

How to use it:

async function example() {
  const locations = await prisma.location.findMany({
    where: { areaId: 'some-area-id' },
    select: { id: true, name: true, entityId: true, entityType: true },
  });

  const locationsWithEntities = await fetchEntitiesForLocations(locations);

  for (const { location, entityDetails } of locationsWithEntities) {
    console.log('Location:', location.name);
    console.log('Entity details:', entityDetails);
  }
}

Optional improvements:

    Batch queries by entity type (fetch all lifts in one query, all trails in one query) for performance.

    Cache entity details if you need to reuse.

If you want, I can also help you with a batch version to reduce DB roundtrips!



1. Efficient Updates (Using updateMany)

You're using updateMany() in several places (e.g., updateByMountain, updateIncident) where update() would be more precise and performant if you’re only updating a single record.

Example:

await prisma.location.update({
  where: { id: locationId },
  data: updatedData,
});

Consider switching to update() unless there’s a need to update multiple records (which doesn’t seem to be the case based on your constraints).
2. Schema Enforcement at the DB Level

You’re doing manual existence checks in code, which is great, but also consider enforcing foreign key constraints in your Prisma schema (@relation(onDelete: ...)) to help catch invalid references early.
3. Consistent Use of findFirst vs findUnique

You use findFirst where the ID should be unique (e.g., locationId). Use findUnique when querying by primary key or a unique field for better performance and semantic clarity.
4. Validation Layer

There’s currently no validation of inputs (e.g., whether a name is provided when creating a location). You might want to add something like Zod or Joi either in the controller or as middleware to enforce expected shapes.
5. Transactional Operations

Some operations involve multiple DB calls (e.g., moving equipment, adding hours). If consistency matters, especially in concurrent scenarios, consider wrapping those in a prisma.$transaction().


ou'll need to manually join the specific entity based on entityType and entityId.

Here's how to do it in JavaScript/TypeScript with prisma:

const locations = await prisma.location.findMany({
  where: { mountainId: "your-mountain-id" },
});

const detailedLocations = await Promise.all(locations.map(async (loc) => {
  switch (loc.entityType) {
    case "Trail":
      const trail = await prisma.trail.findUnique({ where: { id: loc.entityId! } });
      return { ...loc, ...trail };
    case "Lift":
      const lift = await prisma.lift.findUnique({ where: { id: loc.entityId! } });
      return { ...loc, ...lift };
    case "Lodge":
      const lodge = await prisma.lodge.findUnique({ where: { id: loc.entityId! } });
      return { ...loc, ...lodge };
    case "AidRoom":
      const aidRoom = await prisma.aidRoom.findUnique({ where: { id: loc.entityId! } });
      return { ...loc, ...aidRoom };
    case "Hut":
      const hut = await prisma.hut.findUnique({ where: { id: loc.entityId! } });
      return { ...loc, ...hut };
    default:
      return loc;
  }
}));

Optional Optimization:

If you're fetching locations only of a specific type, you can:

const trails = await prisma.trail.findMany({
  where: { mountainId: "your-mountain-id" },
  include: {
    area: true,
    mountain: true,
  },
});

Alternative Schema Design (Not Needed Now):

If you ever want Prisma to support direct relations from Location → Trail | Lift | Lodge, you'd have to:

    Use explicit union modeling with nullable one-to-one relations.

    Add locationId on the trail/lift/etc. and back-relate it to Location.

But your current design is solid for flexibility and scale — just requires manual logic like above.

Let me know if you'd like me to help write a function to format detailedLocations into a table or display component!
You said:
where exactly would I place the code and which should I do for best modern practices and scalability
ChatGPT said:

To display all relevant fields for each type of location (like Trail, Lift, Lodge, etc.) when querying a Location, you need to perform additional Prisma queries based on the entityType and entityId in your Location model.
✅ Modern, Scalable Approach

Use a discriminator + conditional logic to query each specific model (Trail, Lift, Lodge, etc.) in your backend resolver/service logic outside of Prisma. Since Prisma does not support polymorphic relations natively (yet), this is the best modern practice for flexibility and scalability.
🔧 Example

Assuming you're fetching a list of Locations and want to "expand" the related model based on its entityType, do something like this in your backend (e.g., TypeScript/Node):

const locations = await prisma.location.findMany({
  where: { mountainId },
  select: {
    id: true,
    name: true,
    entityType: true,
    entityId: true,
    mountainId: true
  }
})

const expanded = await Promise.all(
  locations.map(async (location) => {
    switch (location.entityType) {
      case 'Trail':
        const trail = await prisma.trail.findUnique({ where: { id: location.entityId } })
        return { ...location, details: trail }

      case 'Lift':
        const lift = await prisma.lift.findUnique({ where: { id: location.entityId } })
        return { ...location, details: lift }

      case 'Lodge':
        const lodge = await prisma.lodge.findUnique({ where: { id: location.entityId } })
        return { ...location, details: lodge }

      // Add others (Hut, AidRoom, etc.) here...

      default:
        return location
    }
  })
)

return expanded

✅ Why this is the best practice:

    Scalable: You avoid cluttering your Location model with tons of optional relations.

    Flexible: You can easily extend it to support more LocationTypes or custom logic per type.

    Fast in practice: Can batch queries using Promise.all or use prisma.$transaction() for efficiency.

    Works with APIs: Cleanly maps to REST or GraphQL layers with typed discriminators.

🗂 Where to Place This Code

Depending on your stack:

    Backend API (Node.js/Express/NestJS):

        Place in a service layer (e.g., locationService.ts)

        Then expose it in a controller or resolver (e.g., GET /locations)

    GraphQL Resolver:

        Add logic in a Location.details field resolver that returns the expanded type

    tRPC or Next.js API Route:

        Place this in the route handler or procedure for getLocations

🧩 Option: Add a Virtual Field (e.g., details) on the frontend

If you’re working with a frontend (e.g., React or Vue), return the details field alongside the Location, and use conditional UI components:

{location.entityType === "Trail" && (
  <TrailCard {...location.details} />
)}




types come from a shared folder index.ts file from the postgresql prisma backend I don't have a separate one for lift, trail, etc...

show with trail


```
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum LOCATION_TYPE {
  AID_ROOM   @map("Aid Room")
  HUT
  LODGE
  LIFT
  TRAIL
  MOUNTAIN
  OTHER
}

enum STATUS {
  OPEN
  CLOSED
  ON_HOLD      @map("On Hold")
  UNKNOWN
}

enum INCIDENT_STATUS {
  STANDBY
  REPORTED
  IN_PROGRESS    @map("In Progress")
  RESOLVED
  UNKNOWN
}

enum EQUIPMENT_STATUS {
  OPERATIONAL
  IN_SERVICE          @map("In Service")
  OUT_OF_SERVICE      @map("Out Of Service")
  IN_USE              @map("In Use")
  CLEANING
  NEEDS_INSPECTION    @map("Needs Inspection")
  PENDING_REPAIR      @map("Pending Repair")
  UNDER_MAINTENANCE   @map("Under Maintenance")
  LOST
  DAMAGED
  RETIRED
  STANDBY
}

enum LIFT_TYPE {
  CHAIR
  GONDOLA
  SURFACE
  ROPE
  CONVEYOR
  OTHER
}

enum TRAIL_CONDITION {
  MACHINE_GROOMED    @map("Machine Groomed") 
  HARD_PACK          @map("Hard Pack")
  PACKED_POWDER      @map("Packed Powder")
  POWDER
  MOGULS
  NATURAL
  GLADES
  CLOSED
}

enum TRAIL_DIFFICULTY {
  GREEN_CIRCLE         @map("Green Circle")
  BLUE_SQUARE          @map("Blue Square")
  BLACK_DIAMOND        @map("Black Diamond")
  DOUBLE_BLACK_DIAMOND @map("Double Black Diamond")
  TERRAIN_PARK         @map("Terrain Park")
  RACE_COURSE          @map("Race Course")
}

enum DEPARTMENT {
  PATROL
  LIFT_OPERATIONS      @map("Lift Operations")
  DISPATCH
  MAINTENANCE
  ADMINISTRATION
  OTHER
}

enum AREA_TYPE {
  BASE_AREA
  MOUNTAIN_AREA
  SUMMIT
  OTHER
}

enum EMPLOYEE_ROLES {
  SUPERVISOR
  ADVANCED_PATROLLER
  HILL_CHIEF
  SPECIALIST
  TRAINER
  DIRECTOR
}

model Area {
  id          String    @id @default(uuid())
  mountainId  String
  name        String
  type        AREA_TYPE
  description String?

  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  
  locations   Location[] @relation("AreaLocation")

  @@index([mountainId])
}

model Location {
  id          String       @id @default(uuid())
  mountainId  String
  name        String

  areaId      String?
  area        Area?        @relation("AreaLocation", fields: [areaId], references: [id])

  entityId    String      @unique
  entityType  LOCATION_TYPE

  mountain    Mountain     @relation("MountainLocation", fields: [mountainId], references: [id], onDelete: Cascade)

  lift        Lift?        @relation("LiftLocation")
  trail       Trail?       @relation("TrailLocation")
  hut         Hut?         @relation("HutLocation")
  lodge       Lodge?       @relation("LodgeLocation")
  aidRoom     AidRoom?     @relation("AidRoomLocation")

  hours       Hours[]
  equipment   Equipment[]
  incidents   Incident[]

  @@index([entityType])
  @@index([mountainId, entityType])
  @@index([areaId])
  @@index([mountainId, areaId, entityType])
}

model Hours {
  id          String       @id @default(uuid())
  locationId  String
  location    Location   @relation(fields: [locationId], references: [id], onDelete: Cascade)

  dayOfWeek   Int?         // Day of the week (1 = Monday, 7 = Sunday, null for specific dates)
  date        DateTime?    // Specific date for holidays or exceptions (null for regular days)
  openTime    DateTime?
  closeTime   DateTime?
  status      STATUS        @default(OPEN) 
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@unique([locationId, dayOfWeek, date])
}

model Mountain {
  id                String   @id @default(uuid())
  name              String   @unique
  latitude          Decimal?
  longitude         Decimal?
  height            Int
  phoneNumber       String
  address           String
  city              String
  state             String
  zipcode           String
  openingDate       DateTime?
  closingDate       DateTime?
  weather           Weather[]
  locations         Location[] @relation("MountainLocation")

  areas             Area[]
  aidRooms          AidRoom[]
  huts              Hut[]
  lodges            Lodge[]
  lifts             Lift[]
  trails            Trail[]
  
  aidRoomChecks     AidRoomCheck[]
  hutChecks         HutCheck[]
  liftChecks        LiftCheck[]
  trailChecks       TrailCheck[]
  equipmentChecks   EquipmentCheck[]
  incidents         Incident[]
  equipment         Equipment[]

  employeeAssignments     EmployeeMountainAssignment[]
  dispatcherAssignments   DispatcherAssignment[]
  incidentEquipmentUsageLog    IncidentEquipmentUsageLog[]
  equipmentServiceLogs    EquipmentServiceLog[]
}

model Weather {
  id            String    @id @default(uuid())
  mountainId    String
  mountain   Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  date          DateTime  @default(now())

  temperature   Float
  windSpeed     Float
  windDirection String?
  visibility    Float?
  conditions    String
  snowfallRecent Float?
  snowfall24h   Float?
  snowfall7d    Float?

  createdAt     DateTime @default(now())
  updatedAt     DateTime  @updatedAt
}

model EmployeeMountainAssignment {
  id          String    @id @default(uuid())
  employeeId  String
  mountainId  String
  assignedAt  DateTime @db.Date

  employee    Employee  @relation(fields: [employeeId], references: [id])
  mountain   Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)

  @@index([mountainId])
  @@index([employeeId])
  @@unique([employeeId, mountainId])
}

model DispatcherAssignment {
  id           String     @id @default(uuid())
  employeeId   String
  mountainId   String
  assignedAt   DateTime @db.Date

  employee     Employee   @relation(fields: [employeeId], references: [id])
  mountain     Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)

  @@index([employeeId])
  @@index([mountainId])
  @@unique([employeeId, mountainId, assignedAt])
}

model Role {
  id          String   @id @default(uuid())
  department  DEPARTMENT
  name        String
  title       String
  position    String
  level       Int?
  permissions String[]        // Array of permissions (e.g., ["CREATE_INCIdENT", "ASSIGN_EQUIPMENT"])

  employees   Employee[]
  employeeRole  EmployeeRole[]

  @@unique([department, name])
}

model EmployeeRole {
  id         String   @id @default(uuid())
  employeeId String
  roleId     String

  employee   Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  role       Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@unique([employeeId, roleId])
}

model Employee {
  id                String     @id @default(uuid())
  employeeIdNumber  Int        @unique
  email             String     @unique
  phoneNumber       String
  name              String
  roleId            String?
  role              Role?       @relation(fields: [roleId], references: [id])

  additionalRoles   EmployeeRole[]

  mountainAssignments   EmployeeMountainAssignment[]
  dispatcherAssignments DispatcherAssignment[]

  incidents             Incident[]    @relation("IncidentEmployees")
  aidRoomChecks         AidRoomCheck[]
  hutChecks             HutCheck[]
  liftChecks            LiftCheck[]
  trailChecks           TrailCheck[]
  equipmentChecks       EquipmentCheck[]
  equipmentServiceLogs  EquipmentServiceLog[]
}

model Lift {
  id          String   @id @default(uuid())
  mountainId  String
  name        String
  type        LIFT_TYPE
  status      STATUS   @default(UNKNOWN)
  capacity    Int
  latitude    Decimal?
  longitude   Decimal?

  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  liftChecks  LiftCheck[]
  
  locationId  String      @unique
  location    Location    @relation("LiftLocation", fields: [locationId], references: [id])

  @@index([mountainId])
  @@unique([name, type])
  @@unique([mountainId, name])
}

model Trail {
  id          String   @id @default(uuid())
  mountainId  String
  name        String
  difficulty  TRAIL_DIFFICULTY
  status      STATUS   @default(UNKNOWN)
  length      Float
  latitude    Decimal?
  longitude   Decimal?
  condition   TRAIL_CONDITION   @default(CLOSED)

  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  trailChecks TrailCheck[]
  
  locationId  String      @unique
  location    Location    @relation("TrailLocation", fields: [locationId], references: [id])

  @@index([mountainId])
  @@unique([mountainId, name])
}

model Lodge {
  id          String   @id @default(uuid())
  mountainId  String
  name        String
  capacity    Int
  latitude    Decimal?
  longitude   Decimal?
  status      STATUS   @default(UNKNOWN)

  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  
  locationId  String      @unique
  location    Location    @relation("LodgeLocation", fields: [locationId], references: [id])

  @@index([mountainId])
  @@unique([mountainId, name])
}

model Hut {
  id          String   @id @default(uuid())
  mountainId  String
  name        String
  status      STATUS   @default(UNKNOWN)
  latitude    Decimal?
  longitude   Decimal?

  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  hutChecks   HutCheck[]

  locationId  String      @unique
  location    Location    @relation("HutLocation", fields: [locationId], references: [id])

  @@index([mountainId])
  @@unique([mountainId, name])
}

model AidRoom {
  id             String       @id @default(uuid())
  mountainId     String
  name           String
  status         STATUS       @default(UNKNOWN)
  latitude       Decimal?
  longitude      Decimal?

  mountain       Mountain     @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  aidRoomChecks  AidRoomCheck[]

  locationId  String      @unique
  location    Location    @relation("AidRoomLocation", fields: [locationId], references: [id])

  @@index([mountainId])
  @@unique([mountainId, name])
}

model EquipmentServiceLog {
  id             String   @id @default(uuid())
  mountainId     String
  equipmentId    String
  employeeId     String?

  status         EQUIPMENT_STATUS   @default(OPERATIONAL)
  changedAt      DateTime @default(now())
  notes          String?

  mountain       Mountain  @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  employee       Employee? @relation(fields: [employeeId], references: [id])
  equipment      Equipment @relation(fields: [equipmentId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([mountainId, equipmentId])
}

model Equipment {
  id          String   @id @default(uuid())
  name        String
  type        String
  number      Int?
  description String?
  status      EQUIPMENT_STATUS   @default(OPERATIONAL)
  picture     String?
  cost        Float?
  latitude    Decimal?
  longitude   Decimal?
  mountainId  String
  mountain    Mountain @relation(fields: [mountainId], references: [id])

  locationId      String?    @unique
  location        Location? @relation(fields: [locationId], references: [id])

  dateAdded               DateTime @default(now())
  incidentEquipmentUsageLogs   IncidentEquipmentUsageLog[]    
  equipmentChecks         EquipmentCheck[]
  equipmentServiceLogs    EquipmentServiceLog[]

  @@unique([mountainId, number])
  @@index([mountainId, locationId])
  @@index([locationId])
}

model Incident {
  id             String       @id @default(uuid())
  description    String
  status         INCIDENT_STATUS   @default(REPORTED)
  latitude       Decimal?
  longitude      Decimal?
  mountainId     String
  mountain       Mountain     @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  startTime      DateTime     @default(now())
  endTime        DateTime?
  onSceneTime    DateTime?
  stableTime     DateTime?
  transportTime  DateTime?
  emptyRun       Boolean      @default(false)
  emptyRunAt     DateTime?
  incidentEquipmentUsageLog  IncidentEquipmentUsageLog[]

  locationId    String
  location      Location @relation(fields: [locationId], references: [id])

  employees     Employee[] @relation("IncidentEmployees")

  @@index([mountainId, locationId])
  @@index([mountainId, id, startTime])
  @@index([mountainId, startTime])
  @@index([locationId, startTime])
}

model IncidentEquipmentUsageLog {
  id            String       @id @default(uuid())
  usedAt        DateTime     @default(now())
  notes         String?
  mountainId    String
  equipmentId   String
  incidentId    String

  mountain      Mountain     @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  incident      Incident     @relation(fields: [incidentId], references: [id], onDelete: Cascade)
  equipment     Equipment    @relation(fields: [equipmentId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([mountainId, incidentId])
  @@index([mountainId, equipmentId])
  @@index([mountainId, usedAt])
  
}

model LiftCheck {
  id          String   @id @default(uuid())
  recordedAt  DateTime @default(now())
  employeeId  String
  employee    Employee @relation(fields: [employeeId], references: [id])
  mountainId  String
  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  liftId      String
  lift        Lift     @relation(fields: [liftId], references: [id], onDelete: Cascade)
  notes       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([liftId])
  @@index([mountainId, recordedAt, employeeId])

  @@index([mountainId, createdAt])
  @@index([liftId, createdAt])
}

model TrailCheck {
  id          String   @id @default(uuid())
  recordedAt  DateTime @default(now())
  employeeId  String
  employee    Employee @relation(fields: [employeeId], references: [id])
  mountainId  String
  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  trailId     String
  trail       Trail    @relation(fields: [trailId], references: [id], onDelete: Cascade)
  notes       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([trailId])
  @@index([mountainId, recordedAt, employeeId])

  @@index([mountainId, createdAt])
  @@index([trailId, createdAt])
}

model HutCheck {
  id          String   @id @default(uuid())
  recordedAt  DateTime @default(now())
  employeeId  String
  employee    Employee @relation(fields: [employeeId], references: [id])
  mountainId  String
  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  hutId       String
  hut         Hut      @relation(fields: [hutId], references: [id], onDelete: Cascade)
  notes       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([hutId])
  @@index([mountainId, recordedAt, employeeId])

  @@index([mountainId, createdAt])
  @@index([hutId, createdAt])
}

model AidRoomCheck {
  id          String   @id @default(uuid())
  recordedAt  DateTime @default(now())
  employeeId  String
  employee    Employee @relation(fields: [employeeId], references: [id])
  mountainId  String
  mountain    Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  aidRoomId   String
  aidRoom     AidRoom  @relation(fields: [aidRoomId], references: [id], onDelete: Cascade)
  notes       String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([aidRoomId])
  @@index([mountainId, recordedAt, employeeId])

  @@index([mountainId, createdAt])
  @@index([aidRoomId, createdAt])
}

model EquipmentCheck {
  id           String   @id @default(uuid())
  recordedAt   DateTime @default(now())
  employeeId   String
  employee     Employee @relation(fields: [employeeId], references: [id])
  mountainId   String
  mountain     Mountain @relation(fields: [mountainId], references: [id], onDelete: Cascade)
  equipmentId  String
  equipment    Equipment @relation(fields: [equipmentId], references: [id], onDelete: Cascade)
  notes        String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([equipmentId])
  @@index([mountainId, recordedAt, employeeId])

  @@index([mountainId, createdAt])
  @@index([equipmentId, createdAt])
}
```

frontend api file
```
import axios from 'axios';
import type { Trail, TrailCheck } from 'shared/types';

const IP = import.meta.env.VITE_BACKEND_IP;
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `${IP}:${PORT}`;

const url = (path: string) => `${BASE_URL}${path}`;

export const trailApi = {
    // Trail endpoints
    async createTrail(mountainId: string, trail: Omit<Trail, 'id' | 'mountainId' | 'trailChecks' | 'mountain'>) {
        const res = await axios.post<Trail>(url(`/api/mountains/${mountainId}/trails`), trail);
        return res.data;
    },

    async getTrails(mountainId: string) {
        const res = await axios.get<Trail[]>(url(`/api/mountains/${mountainId}/trails`));
        return res.data;
    },

    async getTrail(mountainId: string, trailId: string) {
        const res = await axios.get<Trail>(url(`/api/mountains/${mountainId}/trails/${trailId}`));
        return res.data;
    },

    async updateTrail(mountainId: string, trailId: string, updated: Partial<Trail>) {
        const res = await axios.put<Trail>(url(`/api/mountains/${mountainId}/trails/${trailId}`), updated);
        return res.data;
    },

    async deleteTrail(mountainId: string, trailId: string) {
        const res = await axios.delete<Trail>(url(`/api/mountains/${mountainId}/trails/${trailId}`));
        return res.data;
    },

    // TrailCheck endpoints
    async createTrailCheck(
        mountainId: string,
        trailId: string,
        check: Omit<
            TrailCheck,
            | 'id'
            | 'mountainId'
            | 'trailId'
            | 'employeeId'
            | 'createdAt'
            | 'updatedAt'
            | 'mountain'
            | 'trail'
            | 'employee'
        >
    ) {
        const res = await axios.post<TrailCheck>(
            url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks`),
            check
        );
        return res.data;
    },

    async getTrailChecks(mountainId: string, trailId: string) {
        const res = await axios.get<TrailCheck[]>(url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks`));
        return res.data;
    },

    async getTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
        const res = await axios.get<TrailCheck>(
            url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`)
        );
        return res.data;
    },

    async updateTrailCheck(mountainId: string, trailId: string, trailCheckId: string, updated: Partial<TrailCheck>) {
        const res = await axios.put<TrailCheck>(
            url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`),
            updated
        );
        return res.data;
    },

    async deleteTrailCheck(mountainId: string, trailId: string, trailCheckId: string) {
        const res = await axios.delete<TrailCheck>(
            url(`/api/mountains/${mountainId}/trails/${trailId}/trailChecks/${trailCheckId}`)
        );
        return res.data;
    },
};
```

backend controller

```
import { Request, Response } from 'express';
import { prisma } from '../../config/database.js';
import TrailModel from '../../models/mountains/trailModel.js';
import { asyncWrapper } from '../../utils/asyncWrapper.js';

class TrailController {
    createTrail = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;
        const trailData = req.body;

        if (!mountainId) {
            res.status(400).json({ message: 'Mountain ID is required' });
            return;
        }

        const mountainExists = await prisma.mountain.findUnique({
            where: { id: mountainId },
        });
        if (!mountainExists) {
            res.status(404).json({ message: 'Mountain not found' });
            return;
        }

        const trail = await TrailModel.create(mountainId, trailData);
        res.status(201).json(trail);
    });

    getTrail = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId } = req.params;

        if (!mountainId || !trailId) {
            res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
            return;
        }

        const trail = await TrailModel.findByIdAndMountain(trailId, mountainId);
        if (!trail) {
            res.status(404).json({ message: 'Trail not found' });
            return;
        }

        res.status(200).json(trail);
    });

    getTrails = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId } = req.params;

        if (!mountainId) {
            res.status(400).json({ message: 'Mountain ID is required' });
            return;
        }

        const trails = await TrailModel.findAllByMountain(mountainId);
        res.status(200).json(trails);
    });

    updateTrail = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId } = req.params;
        const trailData = req.body;

        if (!mountainId || !trailId) {
            res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
            return;
        }

        const trailExists = await TrailModel.findByIdAndMountain(trailId, mountainId);
        if (!trailExists) {
            res.status(404).json({ message: 'Trail not found' });
            return;
        }

        const updatedTrail = await TrailModel.updateById(trailId, trailData);
        res.status(200).json(updatedTrail);
    });

    deleteTrail = asyncWrapper(async (req: Request, res: Response) => {
        const { mountainId, trailId } = req.params;

        if (!mountainId || !trailId) {
            res.status(400).json({ message: 'Mountain ID and Trail ID are required' });
            return;
        }

        const trailExists = await TrailModel.findByIdAndMountain(trailId, mountainId);
        if (!trailExists) {
            res.status(404).json({ message: 'Trail not found' });
            return;
        }

        await TrailModel.deleteById(trailId);
        res.status(204).send();
    });
}

export default new TrailController();
```

example for mountain form

```
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { mountainApi }  from '../../api/MountainAPI';
import { useMountain } from '../../contexts/MountainContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import StateAutocomplete from '../AutoComplete/StatesAutoComplete';

type MountainInput = {
    name: string;
    city: string;
    state: string;
    latitude: number | null;
    longitude: number | null;
    height: number | null;
    phoneNumber?: string;
    address?: string;
    zipcode?: string;
    openingDate?: string;
    closingDate?: string;
};

const MountainForm: React.FC = () => {
    const [form, setForm] = useState<MountainInput>({
        name: '',
        city: '',
        state: '',
        latitude: null,
        longitude: null,
        height: null,
        phoneNumber: '',
        address: '',
        zipcode: '',
        openingDate: '',
        closingDate: '',
    });
    const { fetchMountains } = useMountain();
    const { showSnackbar } = useSnackbarContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? null : Number(value)) : value,
        }));
    };

    const handleStateChange = (state: string) => {
        setForm((prev) => ({ ...prev, state }));
    };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        await mountainApi.createMountain(form);
        setForm({
            name: '',
            city: '',
            state: '',
            latitude: null,
            longitude: null,
            height: null,
            phoneNumber: '',
            address: '',
            zipcode: '',
            openingDate: '',
            closingDate: '',
        });
        await fetchMountains();
        showSnackbar(`${form.name} created successfully`, 'success');
    } catch (error) {
        showSnackbar('Error creating mountain', 'error');
    }
};

    return (
        <form className="bg-white dark:bg-gray-800 rounded shadow p-6 max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">City</label>
                <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">State</label>
                <StateAutocomplete state={form.state} setState={handleStateChange} />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Latitude</label>
                <input
                    type="number"
                    name="latitude"
                    value={form.latitude ?? ''}
                    onChange={handleChange}
                    step="any"
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Longitude</label>
                <input
                    type="number"
                    name="longitude"
                    value={form.longitude ?? ''}
                    onChange={handleChange}
                    step="any"
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Height (ft)</label>
                <input
                    type="number"
                    name="height"
                    value={form.height ?? ''}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Address</label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Zipcode</label>
                <input
                    type="text"
                    name="zipcode"
                    value={form.zipcode}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Opening Date</label>
                <input
                    type="date"
                    name="openingDate"
                    value={form.openingDate}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Closing Date</label>
                <input
                    type="date"
                    name="closingDate"
                    value={form.closingDate}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Add Mountain
            </button>
        </form>
    );
};

export default MountainForm;
```





can I fix
7:05:11 AM [vite] (client) hmr invalidate /src/contexts/MountainContext.tsx Could not Fast Refresh (export removed)

```
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mountainApi } from '../api/MountainAPI';
import type { Mountain } from 'shared/types';

type MountainContextType = {
    selectedMountain: Mountain | null;
    setSelectedMountain: (mountain: Mountain | null) => void;
    mountains: Mountain[];
    fetchMountains: () => Promise<void>;
    isLoading: boolean;
};

const MountainContext = createContext<MountainContextType | undefined>(undefined);

const MountainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedMountain, setSelectedMountainState] = useState<Mountain | null>(null);
    const [mountains, setMountains] = useState<Mountain[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMountains = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await mountainApi.getAllMountains();
            setMountains(data);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMountains();
    }, [fetchMountains]);

    const setSelectedMountain = (mountain: Mountain | null) => {
        setSelectedMountainState(mountain);
        if (mountain) {
            localStorage.setItem('selectedMountainId', mountain.id);
        } else {
            localStorage.removeItem('selectedMountainId');
        }
    };

    useEffect(() => {
        const storedId = localStorage.getItem('selectedMountainId');
        if (storedId && mountains.length > 0) {
            const found = mountains.find((m) => m.id === storedId);
            if (found) setSelectedMountainState(found);
        }
    }, [mountains]);

    return (
        <MountainContext.Provider
            value={{
                selectedMountain,
                setSelectedMountain,
                mountains,
                fetchMountains,
                isLoading,
            }}
        >
            {children}
        </MountainContext.Provider>
    );
};

export const useMountain = () => {
    const context = useContext(MountainContext);
    if (!context) throw new Error('useMountain must be used within a MountainProvider');
    return context;
};

export default MountainProvider;
```
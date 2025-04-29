
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.MountainScalarFieldEnum = {
  id: 'id',
  name: 'name',
  latitude: 'latitude',
  longitude: 'longitude',
  height: 'height',
  hours: 'hours',
  phoneNumber: 'phoneNumber',
  address: 'address',
  city: 'city',
  state: 'state',
  zipcode: 'zipcode',
  openingDate: 'openingDate',
  closingDate: 'closingDate'
};

exports.Prisma.WeatherScalarFieldEnum = {
  id: 'id',
  mountainId: 'mountainId',
  date: 'date',
  temperature: 'temperature',
  windSpeed: 'windSpeed',
  windDirection: 'windDirection',
  visibility: 'visibility',
  conditions: 'conditions',
  snowfall24h: 'snowfall24h',
  snowfall7d: 'snowfall7d',
  updatedAt: 'updatedAt'
};

exports.Prisma.EmployeeScalarFieldEnum = {
  id: 'id',
  employeeIdNumber: 'employeeIdNumber',
  email: 'email',
  phoneNumber: 'phoneNumber',
  name: 'name',
  title: 'title',
  role: 'role',
  department: 'department',
  mountainId: 'mountainId'
};

exports.Prisma.DispatcherAssignmentScalarFieldEnum = {
  id: 'id',
  employeeId: 'employeeId',
  assignedAt: 'assignedAt',
  mountainId: 'mountainId'
};

exports.Prisma.LiftScalarFieldEnum = {
  id: 'id',
  name: 'name',
  capacity: 'capacity',
  status: 'status',
  latitude: 'latitude',
  longitude: 'longitude',
  mountainId: 'mountainId'
};

exports.Prisma.TrailScalarFieldEnum = {
  id: 'id',
  name: 'name',
  status: 'status',
  difficulty: 'difficulty',
  length: 'length',
  condition: 'condition',
  latitude: 'latitude',
  longitude: 'longitude',
  mountainId: 'mountainId'
};

exports.Prisma.LodgeScalarFieldEnum = {
  id: 'id',
  latitude: 'latitude',
  longitude: 'longitude',
  name: 'name',
  capacity: 'capacity',
  hours: 'hours',
  status: 'status',
  mountainId: 'mountainId'
};

exports.Prisma.HutScalarFieldEnum = {
  id: 'id',
  name: 'name',
  status: 'status',
  latitude: 'latitude',
  longitude: 'longitude',
  mountainId: 'mountainId'
};

exports.Prisma.AidRoomScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  status: 'status',
  latitude: 'latitude',
  longitude: 'longitude',
  mountainId: 'mountainId'
};

exports.Prisma.EquipmentServiceLogScalarFieldEnum = {
  id: 'id',
  equipmentId: 'equipmentId',
  serviceStatus: 'serviceStatus',
  changedAt: 'changedAt',
  notes: 'notes'
};

exports.Prisma.EquipmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  description: 'description',
  status: 'status',
  service: 'service',
  picture: 'picture',
  cost: 'cost',
  latitude: 'latitude',
  longitude: 'longitude',
  mountainId: 'mountainId',
  locationType: 'locationType',
  locationId: 'locationId',
  dateAdded: 'dateAdded'
};

exports.Prisma.IncidentScalarFieldEnum = {
  id: 'id',
  description: 'description',
  status: 'status',
  latitude: 'latitude',
  longitude: 'longitude',
  mountainId: 'mountainId'
};

exports.Prisma.IncidentLogScalarFieldEnum = {
  id: 'id',
  incidentId: 'incidentId',
  employeeId: 'employeeId',
  mountainId: 'mountainId',
  locationType: 'locationType',
  locationId: 'locationId',
  locationStatus: 'locationStatus',
  startTime: 'startTime',
  endTime: 'endTime',
  onSceneTime: 'onSceneTime',
  stableTime: 'stableTime',
  transportTime: 'transportTime',
  dryRun: 'dryRun',
  dryRunTime: 'dryRunTime'
};

exports.Prisma.IncidentLogEquipmentScalarFieldEnum = {
  id: 'id',
  incidentLogId: 'incidentLogId',
  equipmentId: 'equipmentId',
  mountainId: 'mountainId',
  usedAt: 'usedAt',
  notes: 'notes'
};

exports.Prisma.LiftCheckScalarFieldEnum = {
  id: 'id',
  date: 'date',
  employeeId: 'employeeId',
  mountainId: 'mountainId',
  liftId: 'liftId',
  notes: 'notes'
};

exports.Prisma.TrailCheckScalarFieldEnum = {
  id: 'id',
  date: 'date',
  employeeId: 'employeeId',
  mountainId: 'mountainId',
  trailId: 'trailId',
  notes: 'notes'
};

exports.Prisma.HutCheckScalarFieldEnum = {
  id: 'id',
  date: 'date',
  employeeId: 'employeeId',
  mountainId: 'mountainId',
  hutId: 'hutId',
  notes: 'notes'
};

exports.Prisma.AidRoomCheckScalarFieldEnum = {
  id: 'id',
  date: 'date',
  employeeId: 'employeeId',
  mountainId: 'mountainId',
  aidRoomId: 'aidRoomId',
  notes: 'notes'
};

exports.Prisma.EquipmentCheckScalarFieldEnum = {
  id: 'id',
  date: 'date',
  employeeId: 'employeeId',
  mountainId: 'mountainId',
  equipmentId: 'equipmentId',
  notes: 'notes'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Department = exports.$Enums.Department = {
  PATROL: 'PATROL',
  LIFT_OPERATIONS: 'LIFT_OPERATIONS',
  DISPATCH: 'DISPATCH',
  MAINTENANCE: 'MAINTENANCE',
  ADMINISTRATION: 'ADMINISTRATION',
  OTHER: 'OTHER'
};

exports.Status = exports.$Enums.Status = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  UNKNOWN: 'UNKNOWN'
};

exports.TrailDifficulty = exports.$Enums.TrailDifficulty = {
  GREEN_CIRCLE: 'GREEN_CIRCLE',
  BLUE_SQUARE: 'BLUE_SQUARE',
  BLACK_DIAMOND: 'BLACK_DIAMOND',
  DOUBLE_BLACK_DIAMOND: 'DOUBLE_BLACK_DIAMOND',
  TERRAIN_PARK: 'TERRAIN_PARK',
  RACE_COURSE: 'RACE_COURSE'
};

exports.TrailCondition = exports.$Enums.TrailCondition = {
  MACHINE_GROOMED: 'MACHINE_GROOMED',
  PACKED_POWDER: 'PACKED_POWDER',
  POWDER: 'POWDER',
  HARD_PACK: 'HARD_PACK',
  GROOMED: 'GROOMED',
  MOGULS: 'MOGULS',
  CLOSED: 'CLOSED'
};

exports.EquipmentService = exports.$Enums.EquipmentService = {
  IN_SERVICE: 'IN_SERVICE',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE',
  NEEDS_INSPECTION: 'NEEDS_INSPECTION',
  PENDING_REPAIR: 'PENDING_REPAIR',
  UNDER_MAINTENANCE: 'UNDER_MAINTENANCE',
  CLEANING: 'CLEANING'
};

exports.EquipmentStatus = exports.$Enums.EquipmentStatus = {
  AVAILABLE: 'AVAILABLE',
  STANDBY: 'STANDBY',
  IN_USE: 'IN_USE',
  RETIRED: 'RETIRED',
  LOST: 'LOST'
};

exports.LocationType = exports.$Enums.LocationType = {
  AID_ROOM: 'AID_ROOM',
  HUT: 'HUT',
  LODGE: 'LODGE',
  TRAIL: 'TRAIL',
  LIFT: 'LIFT',
  OTHER: 'OTHER'
};

exports.Prisma.ModelName = {
  Mountain: 'Mountain',
  Weather: 'Weather',
  Employee: 'Employee',
  DispatcherAssignment: 'DispatcherAssignment',
  Lift: 'Lift',
  Trail: 'Trail',
  Lodge: 'Lodge',
  Hut: 'Hut',
  AidRoom: 'AidRoom',
  EquipmentServiceLog: 'EquipmentServiceLog',
  Equipment: 'Equipment',
  Incident: 'Incident',
  IncidentLog: 'IncidentLog',
  IncidentLogEquipment: 'IncidentLogEquipment',
  LiftCheck: 'LiftCheck',
  TrailCheck: 'TrailCheck',
  HutCheck: 'HutCheck',
  AidRoomCheck: 'AidRoomCheck',
  EquipmentCheck: 'EquipmentCheck'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

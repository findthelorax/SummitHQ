import { PrismaClient, Status, Department, TrailCondition, TrailDifficulty, LiftType, IncidentStatus, EquipmentStatus, LocationType } from '../generated/prisma';

console.log('Initializing Prisma Client...');
const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export {
    prisma,
    connectDatabase,
    Status,
    Department,
    TrailCondition,
    TrailDifficulty,
    LiftType,
    IncidentStatus,
    EquipmentStatus,
    LocationType
};

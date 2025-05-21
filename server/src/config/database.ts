import { PrismaClient, STATUS, DEPARTMENT, TRAIL_CONDITION, TRAIL_DIFFICULTY, LIFT_TYPE, INCIDENT_STATUS, EQUIPMENT_STATUS, LOCATION_TYPE } from '../generated/prisma/index.js';
import logger from './logger.js';

logger.info('Initializing Prisma Client...');
const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect();
        logger.info('Database connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export {
    prisma,
    connectDatabase,
    STATUS,
    DEPARTMENT,
    TRAIL_CONDITION,
    TRAIL_DIFFICULTY,
    LIFT_TYPE,
    INCIDENT_STATUS,
    EQUIPMENT_STATUS,
    LOCATION_TYPE
};
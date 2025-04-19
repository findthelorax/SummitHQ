import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit the process if the database connection fails
    }
};

export { prisma, connectDatabase };
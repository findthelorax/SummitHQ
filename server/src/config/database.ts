import { PrismaClient } from '../generated/prisma/index.js';
import logger from './logger.js';

// Log connection info (obscuring password)
const dbUrlPattern = process.env.DATABASE_URL
	? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@')
	: 'No DATABASE_URL defined';

logger.info(`Initializing Prisma Client with connection: ${dbUrlPattern}`);

// Check for Railway's PostgreSQL environment variables
if (process.env.RAILWAY_ENVIRONMENT) {
	logger.info('Running in Railway environment');

	// Log availability of PostgreSQL variables (without values for security)
	const pgVars = ['PGUSER', 'PGHOST', 'PGPASSWORD', 'PGDATABASE', 'PGPORT'];
	const missingVars = pgVars.filter((v) => !process.env[v]);

	if (missingVars.length > 0) {
		logger.warn(`Missing PostgreSQL variables: ${missingVars.join(', ')}`);
	} else {
		logger.info('All PostgreSQL variables are present');
	}
}

// Initialize with explicit datasource configuration
const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL,
		},
	},
});

const connectDatabase = async (retries = 5) => {
    try {
        await prisma.$connect();
        logger.info('Database connection has been established successfully.');
        
        // Verify connection with a simple query
        await prisma.$queryRaw`SELECT 1`;
        logger.info('Database query test successful');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        
        // Log more details about the error
        if (error instanceof Error) {
            logger.error(`Error message: ${error.message}`);
            logger.error(`Error stack: ${error.stack}`);
        }
        
        // Retry logic
        if (retries > 0) {
            logger.info(`Retrying database connection in 5 seconds... (${retries} attempts remaining)`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectDatabase(retries - 1);
        }
        
        if (process.env.NODE_ENV === 'production') {
            logger.error('Critical database connection failure in production');
            process.exit(1);
        }
    }
};

export { prisma, connectDatabase };

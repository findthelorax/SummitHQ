import { PrismaClient } from '../generated/prisma/index.js';
import logger from './logger.js';

// Manually construct DATABASE_URL if in Railway
if (process.env.RAILWAY_ENVIRONMENT) {
	logger.info('Running in Railway environment');

	const pgVars = ['PGUSER', 'PGHOST', 'PGPASSWORD', 'PGDATABASE', 'PGPORT'];
	const missingVars = pgVars.filter((v) => !process.env[v]);

	if (missingVars.length > 0) {
		logger.warn(`Missing PostgreSQL variables: ${missingVars.join(', ')}`);
	} else {
		logger.info('All PostgreSQL variables are present');

		// Manually construct the connection string
		process.env.DATABASE_URL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
		logger.info(`DATABASE_URL constructed from Railway variables`);
	}
}

// Log connection info (obscuring password)
const dbUrlPattern = process.env.DATABASE_URL
	? process.env.DATABASE_URL.replace(/:([^:@]+)@/, ':****@')
	: 'No DATABASE_URL defined';

logger.info(`Connecting with: ${dbUrlPattern}`);

// Initialize with explicit datasource configuration
const prisma = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL,
		},
	},
	log: ['error', 'warn'],
});

const connectDatabase = async () => {
	try {
		await prisma.$connect();
		logger.info('Database connection has been established successfully.');
	} catch (error) {
		logger.error('Unable to connect to the database:');
		// Log more details about the error
		if (error instanceof Error) {
			logger.error(`Error message: ${error.message}`);
			logger.error(`Error stack: ${error.stack}`);
		}
		process.exit(1);
	}
};

export { prisma, connectDatabase };

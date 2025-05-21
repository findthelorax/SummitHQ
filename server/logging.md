### **1. Install Pino and Related Packages**
Install Pino and its HTTP logger middleware:
```bash
npm install pino pino-pretty pino-http
```

- **`pino`**: The core logging library.
- **`pino-pretty`**: For pretty-printing logs during development.
- **`pino-http`**: Middleware for logging HTTP requests and responses.

---

### **2. Configure Pino Logger**
Create a centralized logger configuration.

#### Example: `src/config/logger.ts`
```typescript
import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: true,
            ignore: 'pid,hostname',
        },
    } : undefined,
});

export default logger;
```

---

### **3. Use Pino for HTTP Logging**
Integrate `pino-http` middleware into your Express app.

#### Example: Update `src/app.ts`
```typescript
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import logger from './config/logger';
import errorHandler from './middleware/errorHandler';
import { connectDatabase } from './config/database';
import mountainRoutes from './routes/mountains';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Add Pino HTTP middleware
app.use(pinoHttp({ logger }));

connectDatabase();

app.use('/api/mountains', mountainRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
```

---

### **4. Log Prisma Queries**
Enable Prisma query logging by using its built-in event listeners.

#### Example: Update database.ts
```typescript
import { PrismaClient } from '../generated/prisma';
import logger from './logger';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Enable Prisma logging
});

prisma.$on('query', (e) => {
    logger.info(`Query: ${e.query}`);
    logger.info(`Params: ${e.params}`);
    logger.info(`Duration: ${e.duration}ms`);
});

prisma.$on('info', (e) => logger.info(e.message));
prisma.$on('warn', (e) => logger.warn(e.message));
prisma.$on('error', (e) => logger.error(e.message));

const connectDatabase = async () => {
    try {
        await prisma.$connect();
        logger.info('Database connection established successfully.');
    } catch (error) {
        logger.error('Database connection failed:', error);
        process.exit(1);
    }
};

export { prisma, connectDatabase };
```

---

### **5. Log Errors with Pino**
Update your error handler to use Pino for logging errors.

#### Example: Update errorHandler.ts
```typescript
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

interface HttpError extends Error {
    status?: number;
}

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.status || 500;

    logger.error({
        method: req.method,
        url: req.url,
        statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;
```

---

### **6. Use Pino in Controllers**
Log important events or errors in your controllers using the Pino logger.

#### Example: Update `src/controllers/mountains/mountainController.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import MountainModel from '../../models/mountains/mountainModel';
import logger from '../../config/logger';

class MountainController {
    async getAllMountains(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            logger.info('Fetching all mountains');
            const mountains = await MountainModel.findAll();
            res.status(200).json(mountains);
        } catch (error) {
            logger.error('Error fetching mountains:', error);
            next(error);
        }
    }

    async createMountain(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mountainData = req.body;
            logger.info('Creating a new mountain', { mountainData });
            const mountain = await MountainModel.create(mountainData);
            res.status(201).json(mountain);
        } catch (error) {
            logger.error('Error creating mountain:', error);
            next(error);
        }
    }
}

export default new MountainController();
```

---

### **7. Test the Logging**
1. Start your backend:
   ```bash
   npm run dev
   ```
2. Trigger API requests and observe logs in the console.
3. Check for:
   - Prisma query logs.
   - HTTP request/response logs.
   - Error logs.

---

### **8. Optional: Write Logs to a File**
To write logs to a file, update the Pino configuration in `logger.ts`:
```typescript
import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: { colorize: true },
                level: 'info',
            },
            {
                target: 'pino/file',
                options: { destination: './logs/app.log' },
                level: 'info',
            },
        ],
    },
});

export default logger;
```
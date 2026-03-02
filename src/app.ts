import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { RootRouter } from './app/rootRouter';
import seedSuperAdmin from './app/DB';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { specs } from './lib/api-doc/api-doc';
import { runCriticalChecks } from './lib/runCriticalChecks';
import { limiter } from './lib/rateLimit/globalRateLimit';

const app: Application = express();
export const prisma = new PrismaClient();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://finupsbd.com',
  'https://admin.finupsbd.com',
  'https://stage.finupsbd.com',
  'https://finupsbd-fronend-developer.vercel.app',
  'https://finupsbd-admin-dashboard.vercel.app',
  'https://api.finupsbd.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman or server-to-server request
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    exposedHeaders: ['set-cookie'], // Add this line
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Note: Automatic seeding on every start is disabled.
runCriticalChecks();
seedSuperAdmin();

// Rate limiting: Allow 100 requests per 15 minutes from a single IP
app.use(limiter);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/v1', RootRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Simple server health-check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now(),
  });
});

// Middleware execution order corrected
app.use(notFound);
app.use(globalErrorHandler);

export default app;

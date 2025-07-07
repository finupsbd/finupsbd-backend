import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { RootRouter } from './app/rootRouter';
import seedSuperAdmin from './app/DB';
import os, { version } from "os"

const app: Application = express();
export const prisma = new PrismaClient();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://admin.finupsbd.com",
    "https://stage.finupsbd.com",
    "https://wwww.finupsbd.com",
    "https://finupsbd-fronend-developer.vercel.app"
  ],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Note: Automatic seeding on every start is disabled.
// import seedSuperAdmin from './app/DB';
seedSuperAdmin();

app.use(passport.initialize());

app.use('/api/v1', RootRouter);

// Simple server health-check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'FinupsBD server is up and running smoothly.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(), // in seconds
    server: {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
    },
    application: {
      name: 'FinupsBD',
      environment: process.env.NODE_ENV || 'development',
      version,
    },
    request: {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
  });
});

// Middleware execution order corrected
app.use(notFound);
app.use(globalErrorHandler);

export default app;
import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { RootRouter } from './app/rootRouter';
import seedSuperAdmin from './app/DB';
import os, { version } from "os"
import rateLimit from 'express-rate-limit';
import path from 'path';
import swaggerUi from "swagger-ui-express";
import { specs } from './lib/api-doc/api-doc';
import { runCriticalChecks } from './lib/runCriticalChecks';




const app: Application = express();
export const prisma = new PrismaClient();

app.use(
  cors({
    origin: [
      "http://localhost:3000",     // User site (dev)
      "http://localhost:3001",     // Admin site (dev)
      "https://finupsbd.com",      // Main site
      "https://admin.finupsbd.com",// Admin site
      "https://stage.finupsbd.com",
      "https://api.finupsbd.com",
      "https://finupsbd-fronend-developer.vercel.app",
      "https://finupsbd-admin-dashboard.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Note: Automatic seeding on every start is disabled.
// import seedSuperAdmin from './app/DB';
runCriticalChecks()
seedSuperAdmin();



// Rate limiting: Allow 100 requests per 15 minutes from a single IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use('/api/v1', RootRouter);


app.use('/__nextjs_original-stack-frames', (req, res) => {
  res.status(204).end();
});

//henarate custom error 


// Simple server health-check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'FinupsBD server is up and running smoothly.',
    developer: "Reza Shamim",
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
      environment: process.env.NODE_ENV || 'development.',
      version,
    },
    request: {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
  });
});

///api documention
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(specs));


// Middleware execution order corrected
app.use(notFound);
app.use(globalErrorHandler);

export default app;

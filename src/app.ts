import { PrismaClient } from '@prisma/client';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import cors from 'cors'
import notFound from './app/middleware/notFound';
import cookieParser from 'cookie-parser'
import { RootRouter } from './app/rootRouter';
import seedSuperAdmin from './app/DB';
import passport from 'passport';
import os from 'os';
import { ConfigFile } from './config';



const app: Application = express();
export const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'],
})

app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
  origin: "*", // Allow only frontend origin
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
  // allowedHeaders: "Content-Type,Authorization"
}));

seedSuperAdmin()


app.use(passport.initialize());


app.use('/api/v1', RootRouter)





// Production-grade health-check endpoint

app.get('/', async (req: Request, res: Response) => {
  // Timestamp and uptime
  const timestamp = new Date().toISOString()
  const uptime = `${Math.floor(process.uptime())}s`

  // Memory usage summary in MB
  const { rss, heapUsed, heapTotal } = process.memoryUsage()
  const memory = {
    rss: `${(rss / 1024 / 1024).toFixed(1)} MB`,
    heapUsed: `${(heapUsed / 1024 / 1024).toFixed(1)} MB`,
    heapTotal: `${(heapTotal / 1024 / 1024).toFixed(1)} MB`,
  }

  // Load averages
  const [load1, load5, load15] = os.loadavg().map(n => n.toFixed(2))

  // Database connectivity
  let db = 'Not Connected'
  try {
    await prisma.$queryRaw`SELECT 1`
    db = 'Connected'
  } catch (err) {
    console.error('DB health check failed:', err)
  }

  res.status(200).json({
    status: true,
    message: 'FinupsBD server is up and running smoothly.',
    timestamp,
    uptime,
    environment: ConfigFile.NODE_ENV || 'development',
    npmVersion: ConfigFile.npm_package_version || 'unknown',
    nodeVersion: ConfigFile.node_version,
    database: db,
    memory,
    loadAverage: { '1m': load1, '5m': load5, '15m': load15 },
    host: os.hostname(),
    arch: process.arch,
  })
})



app.use(globalErrorHandler)    //  global Error handler 
app.use(notFound)              //  user request route not found handler


export default app;


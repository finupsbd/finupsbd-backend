import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import cors from 'cors'
import notFound from './app/middleware/notFound';
import cookieParser from 'cookie-parser'
import { RootRouter } from './app/rootRouter';
import seedSuperAdmin from './app/DB';
import passport from 'passport';
import os from 'os';



const app: Application = express();
export const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'],
})


app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: '*', 
    credentials: true         
}))
seedSuperAdmin()



app.use(passport.initialize());

app.use('/api/v1', RootRouter)






// Production-grade health-check endpoint
app.get('/', async (req: Request, res: Response) => {
  const currentTimestamp = new Date().toISOString();
  const uptimeSeconds = process.uptime();
  const memoryUsage = process.memoryUsage();
  const hostname = os.hostname();
  const loadAverage = os.loadavg();
  const cpuInfo = os.cpus();
  const nodeVersion = process.version;
  const platform = process.platform;
  const processId = process.pid;
  const arch = process.arch;
  const networkInterfaces = os.networkInterfaces();

  // Check database connectivity via Prisma
  let dbStatus = 'unknown';
  try {
    // A simple query to ensure the DB connection is working
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'disconnected';
    console.log(error)
  }

  // Build the detailed health-check response
  res.status(200).json({
    status: 'success',
    message: 'Production health check: finupsBD server is operational.',
    timestamp: currentTimestamp,
    uptime: `${uptimeSeconds.toFixed(2)} seconds`,
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || 'unknown',
    nodeVersion,
    hostname,
    memoryUsage,
    loadAverage,
    cpuInfo: cpuInfo.map(cpu => ({
      model: cpu.model,
      speed: cpu.speed,
      times: cpu.times
    })),
 
    platform,
    processId,
    arch,
    networkInterfaces,
  });
});






app.use(globalErrorHandler)    //  global Error handler 
app.use(notFound)              //  user request route not found handler
 


export default app;


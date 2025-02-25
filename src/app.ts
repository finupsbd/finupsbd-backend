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










app.get('/', (req: Request, res: Response) => {
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

  res.status(200).json({
    status: 'success',
    message: 'finupsBD server is fully operational and healthy.',
    timestamp: currentTimestamp,
    uptime: `${uptimeSeconds.toFixed(2)} seconds`,
    hostname,
    memoryUsage,
    loadAverage,
    // For each CPU, return its model, speed, and time spent in various states.
    cpuInfo: cpuInfo.map(cpu => ({
      model: cpu.model,
      speed: cpu.speed,
      times: cpu.times
    })),
    nodeVersion,
    platform,
    processId,
    arch,
    networkInterfaces,
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || 'unknown'
  });
});





app.use(globalErrorHandler)    //  global Error handler 
app.use(notFound)              //  user request route not found handler
 


export default app;


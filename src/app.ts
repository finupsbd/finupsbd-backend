import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import cors from 'cors'
import notFound from './app/middleware/notFound';
import cookieParser from 'cookie-parser'
import { RootRouter } from './app/rootRouter';
import seedSuperAdmin from './app/DB';
import passport from 'passport';


export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

const app: Application = express();


app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: '*',                // domain link hare when deploy this app
    credentials: true,
}))
seedSuperAdmin()



app.use(passport.initialize());

app.use('/v1', RootRouter)



app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Server is running' });
  
});

app.use(globalErrorHandler)    //  global Error handler 
app.use(notFound)              //  user request route not found handler
 


export default app;


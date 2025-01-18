/* eslint-disable @typescript-eslint/no-unused-vars */
 
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { ConfigFile } from '../../config';
import { StatusCodes } from 'http-status-codes';

 
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let newMessage = "Something went's wrong";
  let error = err;
  let statusCode = StatusCodes.BAD_REQUEST

  //Prisma Validation Error handle
  if (err?.name === 'PrismaClientKnownRequestError') {
    newMessage = `Validation Error from (${err?.meta?.modelName}) model `;
    error = err;
  }

  //generics error handle
  if (err instanceof Error) {
    newMessage = err?.message
    statusCode = StatusCodes.BAD_REQUEST
    error = err
  }
  
  //Zod Validation Error handle
  if (err.name === 'ZodError') {
    console.log("allll");
    newMessage = 'Validation Error';
    error = err?.issues;
  }


  res.status(StatusCodes.BAD_GATEWAY).json({
    success: false,
    message: newMessage,
    statusCode: statusCode,
    error: error,
    stack: ConfigFile.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default globalErrorHandler;

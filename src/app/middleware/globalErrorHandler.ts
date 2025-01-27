/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ConfigFile } from '../../config';
import { Prisma } from '@prisma/client';
import AppError from '../error/AppError';
import { ZodError } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let newMessage = "Something went's wrong";
  let error = {};
  let statusCode = StatusCodes.BAD_REQUEST;

  //generics error handle
  if (err instanceof AppError) {
    newMessage = err?.message;
    statusCode = err?.statusCode;
    error = err;
  }

  //generics error handle
  // if (err instanceof Error) {
  //   newMessage = err?.message
  //   statusCode = StatusCodes.BAD_REQUEST
  //   error = err
  // }

  //Zod Validation Error handle
  if (err instanceof ZodError) {
    const errors = err.errors.map((e: any) => ({
      field: e.path.join('.'),
      error: e.message,
    }));

    res.status(400).json({
      success: false,
      message: 'Invalid input data',
      errors,
      stack: err.stack, 
    });
  }

  // if (err instanceof Prisma.PrismaClientKnownRequestError) {
  //   switch (err.code) {
  //     case 'P2002': // Unique constraint failed
  //       return res.status(400).json({
  //         success: false,
  //         message: `Validation Error: Unique constraint failed on the field: ${err?.meta?.target}`,
  //         statusCode: StatusCodes.NOT_FOUND,
  //         error: err,
  //       });
  //     case 'P2025': // Record not found
  //       return res.status(404).json({
  //         success: false,
  //         message:
  //           'The record you are trying to update or delete does not exist.',
  //         error: err,
  //       });
  //     case 'P2003': // Foreign key constraint failed
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Foreign key constraint failed.',
  //         error: err,
  //       });
  //     case 'P2000': // Value too long for column
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Value is too long for the column.',
  //         error: err,
  //       });
  //     // Add more cases as needed
  //     default:
  //       return res.status(500).json({
  //         success: false,
  //         message: 'A database error occurred.',
  //         error: err,
  //       });
  //   }
  // }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      // Unique constraint failed
      res.status(400).json({
        success: false,
        message: `Validation Error: Unique constraint failed on the field: ${err?.meta?.target}`,
        statusCode: StatusCodes.BAD_REQUEST,
        error: err,
      });
    } else if (err.code === 'P2025') {
      // Record not found
      res.status(404).json({
        success: false,
        message:
          'The record you are trying to update or delete does not exist.',
        error: err,
      });
    } else if (err.code === 'P2003') {
      // Foreign key constraint failed
      res.status(400).json({
        success: false,
        message: 'Foreign key constraint failed.',
        error: err,
      });
    } else if (err.code === 'P2000') {
      // Value too long for column
      res.status(400).json({
        success: false,
        message: 'Value is too long for the column.',
        error: err,
      });
    } else {
      // Default for other Prisma errors
      res.status(500).json({
        success: false,
        message: 'A database error occurred.',
        error: err,
      });
    }
  }

  // Handle Prisma Unknown Errors
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(500).json({
      status: 'error',
      message: 'Unknown database error',
      details:
        'An unexpected error occurred while interacting with the database.',
    });
  }

  // Handle Prisma Validation Errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      status: 'fail',
      message: 'Database query validation error',
      details: err.message,
    });
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

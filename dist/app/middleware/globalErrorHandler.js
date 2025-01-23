"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../config");
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../error/AppError"));
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    let newMessage = "Something went's wrong";
    let error = {};
    let statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    //generics error handle
    if (err instanceof AppError_1.default) {
        newMessage = err === null || err === void 0 ? void 0 : err.message;
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        error = err;
    }
    //generics error handle
    // if (err instanceof Error) {
    //   newMessage = err?.message
    //   statusCode = StatusCodes.BAD_REQUEST
    //   error = err
    // }
    //Zod Validation Error handle
    if (err instanceof zod_1.ZodError) {
        const errors = err.errors.map((e) => ({
            field: e.path.join('.'),
            error: e.message,
        }));
        res.status(400).json({
            success: false,
            message: 'Invalid input data',
            errors,
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
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            // Unique constraint failed
            res.status(400).json({
                success: false,
                message: `Validation Error: Unique constraint failed on the field: ${(_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target}`,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                error: err,
            });
        }
        else if (err.code === 'P2025') {
            // Record not found
            res.status(404).json({
                success: false,
                message: 'The record you are trying to update or delete does not exist.',
                error: err,
            });
        }
        else if (err.code === 'P2003') {
            // Foreign key constraint failed
            res.status(400).json({
                success: false,
                message: 'Foreign key constraint failed.',
                error: err,
            });
        }
        else if (err.code === 'P2000') {
            // Value too long for column
            res.status(400).json({
                success: false,
                message: 'Value is too long for the column.',
                error: err,
            });
        }
        else {
            // Default for other Prisma errors
            res.status(500).json({
                success: false,
                message: 'A database error occurred.',
                error: err,
            });
        }
    }
    // Handle Prisma Unknown Errors
    if (err instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        res.status(500).json({
            status: 'error',
            message: 'Unknown database error',
            details: 'An unexpected error occurred while interacting with the database.',
        });
    }
    // Handle Prisma Validation Errors
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        res.status(400).json({
            status: 'fail',
            message: 'Database query validation error',
            details: err.message,
        });
    }
    res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
        success: false,
        message: newMessage,
        statusCode: statusCode,
        error: error,
        stack: config_1.ConfigFile.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.default = globalErrorHandler;

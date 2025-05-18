// src/middlewares/bankAuth.ts
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ConfigFile } from "../../config";
import { prisma } from "../../app";
import { blacklistedTokens } from "../types/commonTypes";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

// Extend Express Request interface to include userBank


export const bankAuth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1. grab & verify token

    console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Missing auth token");
    }


    if (blacklistedTokens.has(token)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Token is blacklisted");
    }

    const decoded = jwt.verify(
      token,
      ConfigFile.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    console.log("decoded", decoded)
    // 2. lookup bank user by email (or id)
    const bankUser = await prisma.userBank.findFirst({
      where: { email: decoded.email },
    });
    if (!bankUser) {
      throw new AppError(StatusCodes.NOT_FOUND, "Bank user not found");
    }
    if (!bankUser.isActive) {
      throw new AppError(StatusCodes.FORBIDDEN, "Bank user is inactive");
    }

    // 3. enforce role if any
    if ( requiredRoles.length > 0 && !requiredRoles.includes(decoded.role as string)
    ) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        `Insufficient role (${decoded.role})`
      );
    }

    // 4. stash decoded payload (and/or bankUser) on the request
    req.userBank = decoded;
    next();
  });
};

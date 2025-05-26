import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from "jsonwebtoken";
import { ConfigFile } from "../../config";
import { prisma } from "../../app";
import { blacklistedTokens } from "../types/commonTypes";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";


const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
        const token = req.headers.authorization?.split(' ')[1];

        
        if(!token){
            throw new AppError(StatusCodes.UNAUTHORIZED,"You are unauthorized")
        }
        
        if(blacklistedTokens.has(token)){
            throw new AppError(StatusCodes.UNAUTHORIZED,"You are unauthorized")
        }

        const decode = await jwt.verify(token, ConfigFile.JWT_ACCESS_SECRET as string) as JwtPayload
     

        const user = await prisma.user.findUnique({where: {email: decode.email}})
      
        if(!user){
            throw new AppError(StatusCodes.NOT_FOUND,"Your not Found")
        }

        if(!user?.isActive){
            throw new AppError(StatusCodes.BAD_REQUEST,"You are not valid user")
        }

        // if(!user?.emailVerified){
        //     throw new AppError(StatusCodes.BAD_REQUEST,"You are not valid user")
        // }
        
        
        if (requiredRoles && !requiredRoles.includes(decode?.role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED,'you are not authorized role ');
          }
        req.user = decode 
        next()
    })
}



export default auth




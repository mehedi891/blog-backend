import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppError";
import catchAsync from "../utilis/catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const adminAuth = () =>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
        const tokenWithBearer = req?.headers?.authorization;
        if(!tokenWithBearer){
            throw new AppError(StatusCodes.UNAUTHORIZED,"You are not authorized");
        }

      const token = tokenWithBearer.split(' ')[1]
      const decoded = jwt.verify(token, config.jwtSecretKey as string) as JwtPayload ;
      
      if(decoded.role !== 'admin'){
        throw new AppError(StatusCodes.UNAUTHORIZED,"You are not authorized admin");
      }
     

    next();
    });
}

export default adminAuth
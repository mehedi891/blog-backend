import { NextFunction, Request, Response }  from "express"
import catchAsync from "../utilis/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { Blog } from "../modules/blog/blog.model";

const auth = (isCreate:boolean) =>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
        const tokenWithBearer = req?.headers?.authorization;
        if(!tokenWithBearer){
            throw new AppError(StatusCodes.UNAUTHORIZED,"You are not authorized");
        }

      const token = tokenWithBearer.split(' ')[1]
      const decoded = jwt.verify(token, config.jwtSecretKey as string) as JwtPayload ;
    if(decoded.isBlocked){
        throw new AppError(StatusCodes.UNAUTHORIZED,"Your id is blocked, Please contact admin to unblock");
    }
      if(!isCreate){
      const blog = await Blog.singleBlogBYId(req.params.id);
      //console.log(blog.author?.toString(),decoded._id.toString())
        if(blog?.author?.toString() !== decoded?._id?.toString()){
            throw new AppError(StatusCodes.UNAUTHORIZED,"You are not authorized to modify the blog");
        }
    }

    next();
    });
}

export default auth;
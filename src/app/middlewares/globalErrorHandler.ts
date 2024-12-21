import { NextFunction, Request, Response } from "express";
//import status from 'http-status'

const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: err,
        //stack: "Stack"
    })
}

export default globalErrorHandler;
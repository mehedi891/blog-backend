import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken';
import config from "../../config";
import bcrypt from "bcrypt";

const createUserIntoDb = async(payload:TUser) =>{
    const user = await User.create(payload);
    return user;
}

const loginUser = async (payload:TLoginUser) =>{

    const isUserExist = await User.findOne({email:payload?.email}).select("+password")
    if(!isUserExist){
        throw new AppError(StatusCodes.NOT_FOUND,"User is not found")
    }
    console.log(isUserExist)
    const isPassMatch = await bcrypt.compare(payload.password, isUserExist.password);

    if(!isPassMatch){
        throw new AppError(StatusCodes.NOT_ACCEPTABLE,"Email/Password is wrong")
    }


    //create a jwt token
    const jwtPayload = {
        _id: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
        role: isUserExist.role,
        isBlocked: isUserExist.isBlocked

    }
    const token = jwt.sign(jwtPayload, config.jwtSecretKey as string, { expiresIn: '7d' });

    return token
    
}

export const authServices = {
    createUserIntoDb,
    loginUser
}
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";

import {
	StatusCodes,
} from 'http-status-codes';
import config from "../../config";
const userSchema = new Schema<TUser>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique:true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        select: 0
    },
    role:{
        type: String,
        enum:{
            values:["admin","user"],
            message:"{VALUE} is not suppoted"
        },
        trim: true,
        default:'user'
    },
    isBlocked:{
        type: Boolean,
        default:false
    }

},{timestamps:true});

userSchema.pre('save',async function(next){
    const isExist = await User.findOne({email:this.email})
    if(isExist){
        throw new AppError(StatusCodes.NOT_ACCEPTABLE,"User email already exist")
    }
    const hash = bcrypt.hashSync(this.password,Number(config.bSaltRounds) || 11);
    this.password = hash;
    next();
});

userSchema.post('save',async function(doc,next){
    doc.password = '';
    next();
});

export const User = model<TUser>('User',userSchema);

import { model, Schema, Types } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
    name:{
        type:String,
        required: [true,'Name is required'],
        trim:true
    },
    role:{
        type:String,
        enum:['admin'],
        default:'admin'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true}
);

export const Admin = model('Admin',adminSchema);
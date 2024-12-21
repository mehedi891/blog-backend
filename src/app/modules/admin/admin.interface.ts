import { Types } from "mongoose";

export interface TAdmin {
    name:string;
    role:'admin';
    user:Types.ObjectId
} 
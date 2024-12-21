import { model, Schema } from "mongoose";
import { BlogModel, TBlog } from "./blog.interface";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/user.model";

const blogSchema = new Schema<TBlog,BlogModel>({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:true
    }
},{timestamps:true}
);

blogSchema.pre('save',async function(next){
    const id = this?.author;
    const user= await User.findById(id);
    const isBlocked = user?.isBlocked;

    if(isBlocked){
        throw new AppError(StatusCodes.UNAUTHORIZED,"Your id is blocked, Please contact admin to unblock");
    }
    next();
});

blogSchema.statics.singleBlogBYId = async function(id){
    const isExistBlog = await this.findById(id)
    if(!isExistBlog){
        throw new AppError(StatusCodes.NOT_FOUND,"Blog is not found");
    }
    //console.log(isExistBlog)
    return isExistBlog;
}


export const Blog = model<TBlog,BlogModel>('Blog',blogSchema);
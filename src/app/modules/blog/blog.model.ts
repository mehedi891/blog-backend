import { model, Schema } from "mongoose";
import { BlogModel, TBlog } from "./blog.interface";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

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

blogSchema.statics.singleBlogBYId = async function(id){
    const isExistBlog = await this.findById(id)
    if(!isExistBlog){
        throw new AppError(StatusCodes.NOT_FOUND,"Blog is not found");
    }
    //console.log(isExistBlog)
    return isExistBlog;
}


export const Blog = model<TBlog,BlogModel>('Blog',blogSchema);
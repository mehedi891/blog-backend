import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlogIntoDb = async(payload:TBlog) =>{
    const blog = await Blog.create(payload);

    return blog
}

const getAllBlogFromDb = async(query:Record<string,unknown>) =>{
    //console.log(query)
   // const queryObj = {...query}

    const blogSearchableFields = ['title'];
    //{ title:{ $regex: query.search, $options: "i"  } }
    
    let search = '';
    if(query?.search){
        search = query?.search as string;
    }

    //filtering

    //const excludeFields = ['search'];

    // excludeFields.forEach(el => delete queryObj[el]);
    // console.log(queryObj,query)

    const searchQuery = Blog.find({
        $or: blogSearchableFields.map((field)=>({
            [field]: { $regex: search, $options: 'i' }
        }))
    })

    //let filterFields = 'author'
    const filter = query.filter ? {author:query?.filter} : {};
    const filterQuery = searchQuery.find(filter);

  

    let sort = `-${query?.sortBy}` || '-ceatedAt' as string;

    if(query?.sortOrder === 'asc'){
        sort = query?.sortBy as string
    }
    const allBlog = await filterQuery.find().populate("author").sort(sort);
    return allBlog
}

const updateABlogIntoDb = async(payload:Partial<TBlog>,id:string)=>{
    const updatedBlog = await Blog.findByIdAndUpdate(id,payload,{
        new: true,
        runValidators: true,
      });
    return updatedBlog
}

const deleteABlogFromDb = async(id:string)=>{
    const isExistBlog =  await Blog.singleBlogBYId(id);
    if(!isExistBlog){
        throw new AppError(StatusCodes.NOT_FOUND,"Blog is not found");
    }
    const result = await Blog.deleteOne({_id:id});
    return result;
}

export const blogServices = {
    createBlogIntoDb,
    getAllBlogFromDb,
    updateABlogIntoDb,
    deleteABlogFromDb
}
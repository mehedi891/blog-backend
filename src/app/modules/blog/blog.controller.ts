import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { blogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
    const blogData = req.body;
    const blog = await blogServices.createBlogIntoDb(blogData);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Blog created successfully",
        data: blog
    })
});

const getAllBlog = catchAsync(async (req, res) => {
    const blogs = await blogServices.getAllBlogFromDb(req.query);
    //console.log(req.query)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Blogs fetched successfully",
        data: blogs
    })
});

const updateABlog = catchAsync(async (req, res) => {
    const updatedData = req.body;
    const { id } = req.params;
    const blog = await blogServices.updateABlogIntoDb(updatedData, id)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Blog updated successfully",
        data: blog
    })
});


const deleteABlog = catchAsync(async (req, res) => {
    const {id} = req.params;
    await blogServices.deleteABlogFromDb(id);
    sendResponse(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: StatusCodes.OK,
    })
});
export const blogController = {
    createBlog,
    getAllBlog,
    updateABlog,
    deleteABlog
}
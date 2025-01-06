import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { authServices } from "./auth.service";

const registerUser = catchAsync(async (req,res)=>{
    const userData = req?.body;
    //console.log(userData)
    const user = await authServices.createUserIntoDb(userData);

    sendResponse(res,{
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User registered successfully",
        data: user
    });
});

const loginUser = catchAsync(async (req,res)=>{
const token =  await authServices.loginUser(req.body)

  sendResponse(res,{
    success: true,
    statusCode: StatusCodes.OK,
    message: "User login successfully",
    data: {
        token
    }
   
});

});

export const authController = {
    registerUser,
    loginUser
}
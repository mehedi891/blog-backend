import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { adminServices } from "./admin.service";

const blockUser = catchAsync(async (req,res)=>{
    const result = await adminServices.blockUserInDB(req.params.userId);

    sendResponse(res,{
        success: true,
        message: "User blocked successfully",
        statusCode: StatusCodes.OK
    });
});

export const adminController = {
    blockUser,
}
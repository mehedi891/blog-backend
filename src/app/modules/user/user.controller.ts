// import { NextFunction, Request, RequestHandler, Response } from "express"
// import {userServices } from "./user.service"
// import sendResponse from "../../utilis/sendResponse";
// import catchAsync from "../../utilis/catchAsync";


// const createUser = catchAsync(async (req, res) => {
//         const userData = req?.body;
//         console.log(userData)
//         const user = await userServices.createUserIntoDb(userData);

//         sendResponse(res,{
//             success: true,
//             statusCode: 201,
//             message: "User registered successfully",
//             data: user
//         });
// })


// export const  userController = {
//     createUser
// }
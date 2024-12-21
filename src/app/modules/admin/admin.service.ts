import { User } from "../user/user.model"

const blockUserInDB = async (userId:string) =>{
const result = await User.findByIdAndUpdate(userId,{
    isBlocked: true
});
return result;
}

export const adminServices = {
    blockUserInDB,
}
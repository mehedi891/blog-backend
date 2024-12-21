import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error:'Name is required',
        }),
        email: z.string({
            required_error:'Email is required',
        }),
        password: z.string({
            required_error:'Password is required',
        }).max(20,{message: "Password can't exceed 20 character"}),
        role: z.enum(["admin","user"],{message:'Not accepted given value'}).default('user'),
        isBlocked: z.boolean().optional()
    })
});

const loginUserValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is reqiured"
        }),
        password: z.string({
            required_error: "Password is required"
        })
    })
});

export const authValidations = {
    createUserValidationSchema,
    loginUserValidationSchema
}
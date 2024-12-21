import { z } from "zod";

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error:'Tiitle is required'
        }).min(10,"Title must be atleast 10 character"),
        content:z.string({
            required_error:'Content cant be empty'
        }).min(10,"Content must be atleast 10 character")
    })
});

const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error:'Tiitle is required'
        }).min(10,"Title must be atleast 10 character").optional(),
        content:z.string({
            required_error:'Content cant be empty'
        }).min(10,"Content must be atleast 10 character").optional()
    })
});

export const blogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema
}
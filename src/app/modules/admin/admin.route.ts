import express from "express";
import { adminController } from "./admin.controller";
import adminAuth from "../../middlewares/adminAuth";
import { blogController } from "../blog/blog.controller";

const router = express.Router();

router.patch('/users/:userId/block',adminAuth(),adminController.blockUser);
router.delete('/blogs/:id',adminAuth(),blogController.deleteABlog);

export const adminRoutes = router;

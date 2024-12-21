import express from 'express'
import { blogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidations } from './blog.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/',auth(true),validateRequest(blogValidations.createBlogValidationSchema),blogController.createBlog);

router.get('/',blogController.getAllBlog);

router.patch('/:id',auth(false),validateRequest(blogValidations.updateBlogValidationSchema),blogController.updateABlog);

router.delete('/:id',auth(false),blogController.deleteABlog);

export const blogRoutes = router;
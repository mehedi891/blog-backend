import express from "express"
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";



const router = express.Router();



router.post('/register',validateRequest(authValidations.createUserValidationSchema),authController.registerUser);

router.post('/login',validateRequest(authValidations.loginUserValidationSchema),authController.loginUser);

export const authRoutes = router;
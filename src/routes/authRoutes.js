import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";

import schemaValidation from "../middlewares/schemaValidation.js";

import { userSignInSchema, userSignUpSchema } from "../schemas/userSchemas.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(userSignUpSchema), signUp);
authRouter.post("/signin", schemaValidation(userSignInSchema), signIn);

export default authRouter;

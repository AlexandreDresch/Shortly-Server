import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";

import { signUpValidation } from "../middlewares/signUpValidation.js";

const authRouter = Router();

authRouter.post("/signup", signUpValidation, signUp);
authRouter.get("/signin", signIn);

export default authRouter;
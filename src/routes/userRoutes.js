import { Router } from "express";

import { getUserData } from "../controllers/userController.js";

import { tokenValidation } from "../middlewares/tokenValidation.js";

const userRouter = Router();

userRouter.get("/users/me", tokenValidation, getUserData)

export default userRouter;
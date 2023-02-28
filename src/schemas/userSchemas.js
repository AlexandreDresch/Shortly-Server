import Joi from "joi";

export const userSignUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref("password"),
});

export const userSignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
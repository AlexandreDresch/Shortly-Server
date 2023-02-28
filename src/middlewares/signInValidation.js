

import { userSignInSchema } from "../schemas/userSchemas.js";

export async function signInValidation(req, res, next) {
  try {
    const data = await userSignInSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    res.locals.signInValues = data;
    next();
  } catch (error) {
    res.status(422).send(error);
    return;
  }
}

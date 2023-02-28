import db from "../config/database.js";

import { userSignUpSchema } from "../schemas/userSchemas.js";

export async function signUpValidation(req, res, next) {
  try {
    const data = await userSignUpSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const verifyEmailAvailability = await db.query(
      "SELECT id FROM users WHERE email=$1",
      [data.email]
    );

    if (verifyEmailAvailability.rowCount > 0) {
      res.sendStatus(409);
      return;
    }

    res.locals.signUpValues = data;
    next();
  } catch (error) {
    res.status(422).send(error);
    return;
  }
}

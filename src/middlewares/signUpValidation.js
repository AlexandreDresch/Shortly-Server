import db from "../config/database.js";

import { userSchema } from "../schemas/userSchema.js";

export async function signUpValidation(req, res, next) {
  try {
    const data = await userSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const verifyEmailAvailability = await db.query(
      "SELECT id FROM users WHERE email=$1",
      [data.email]
    );

    if(verifyEmailAvailability.rowCount > 0) {
        return res.sendStatus(409);
    }

    res.locals.signUpValues = data;
    next();
  } catch (error) {
    console.error(error);
    return res.status(422).send(error);
  }
}

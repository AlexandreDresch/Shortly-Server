import db from "../config/database.js";

import bcrypt from "bcrypt";
import { v4 } from "uuid";

export async function signUp(_, res) {
  const { value } = res.locals;
  const { name, email, password } = value;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const verifyEmailAvailability = await db.query(
      "SELECT id FROM users WHERE email=$1",
      [email]
    );

    if (verifyEmailAvailability.rowCount > 0) {
      res.sendStatus(409);
      return;
    }

    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

export async function signIn(_, res) {
  const { value } = res.locals;
  const { email, password } = value;

  try {
    const userData = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (
      userData.rowCount > 0 &&
      bcrypt.compareSync(password, userData.rows[0].password)
    ) {
      const token = v4();

      await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [
        token,
        userData.rows[0].id,
      ]);

      res.status(200).send({ token: token });
    } else {
      res.sendStatus(401);
      return;
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

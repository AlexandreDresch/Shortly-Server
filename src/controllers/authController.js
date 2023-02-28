import db from "../config/database.js";

import bcrypt from "bcrypt";
import { v4 } from "uuid";

export async function signUp(req, res) {
  const { signUpValues } = res.locals;
  const { name, email, password } = signUpValues;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
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

export async function signIn(req, res) {
  const { signInValues } = res.locals;
  const { email, password } = signInValues;

  try {
    const userData = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
  
    if (
      userData.rowCount > 0 &&
      bcrypt.compareSync(password, userData.rows[0].password)
    ) {
      const token = v4();
      console.log(token);
      console.log(userData.rows[0].id)
  
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

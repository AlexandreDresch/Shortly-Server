import db from "../config/database.js";
import bcrypt from "bcrypt";

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
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {}

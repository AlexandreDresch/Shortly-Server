import db from "../config/database.js";

export async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
  
    if (!token) {  
      res.sendStatus(401);
      return;
    }

    try {
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

        res.locals.userIdValue = session.rows[0].userId;
        next()
    } catch (error) {
        res.sendStatus(401);
        return;
    }
};
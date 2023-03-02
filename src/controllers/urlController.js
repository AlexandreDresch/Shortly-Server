import db from "../config/database.js";

import { nanoid } from "nanoid";

export async function createShortenedUrl(_, res) {
  const { userIdValue, value } = res.locals;
  const shortUrl = nanoid();

  try {
    const result = await db.query(
      `INSERT INTO "shortenedUrls" (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id;`,
      [value.url, shortUrl, userIdValue]
    );

    const id = result.rows[0].id;

    res.status(201).send({
        id,
        shortUrl
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}



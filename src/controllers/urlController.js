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
      shortUrl,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

export async function getShortenedUrlById(req, res) {
  const { id } = req.params;

  try {
    const urlData = await db.query(
      `SELECT * FROM "shortenedUrls" WHERE id = $1`,
      [id]
    );
    if (urlData.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    res.status(200).send({
      id: urlData.rows[0].id,
      shortUrl: urlData.rows[0].shortUrl,
      url: urlData.rows[0].url,
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const getOriginalUrl = await db.query(
      `UPDATE "shortenedUrls" 
        SET "visitCount" = "visitCount" + 1 
        WHERE "shortUrl" = $1 
      RETURNING url`,
      [shortUrl]
    );

    if (getOriginalUrl.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    res.redirect(getOriginalUrl.rows[0].url);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { userIdValue } = res.locals;

  try {
    const urlToDelete = await db.query(
      `SELECT * FROM "shortenedUrls" WHERE id = $1`,
      [id]
    );

    if (urlToDelete.rowCount === 0) {
      res.sendStatus(404);
      return;
    }

    if (urlToDelete.rows[0].userId === userIdValue) {
      await db.query(
        `DELETE FROM "shortenedUrls" WHERE id = $1 AND "userId" = $2`,
        [id, userIdValue]
      );

      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

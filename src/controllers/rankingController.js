import db from "../config/database.js";

export async function getRanking(_, res) {
  try {
    const ranking = await db.query(`
        SELECT
            u.id AS "id",
            u.name AS "name",
            COUNT(su.id) AS "linksCount",
            SUM(su."visitCount") AS "visitCount"
        FROM users u
            LEFT JOIN "shortenedUrls" su 
            ON su."userId" = u.id
            GROUP BY u.id, u.name
            ORDER BY "visitCount" DESC
        LIMIT 10;
    `);

    res.status(200).send(ranking.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

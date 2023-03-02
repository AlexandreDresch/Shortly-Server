import db from "../config/database.js";

export async function getUserData(_, res) {
  const { userIdValue } = res.locals;

  try {
    const userData = await db.query(
      `
    SELECT 
        users.id as "id",
        users.name as "name",
        SUM("shortenedUrls"."visitCount") as "visitCount",
        json_agg(json_build_object(
            'id', "shortenedUrls".id,
            'shortUrl', "shortenedUrls"."shortUrl",
            'url', "shortenedUrls".url,
            'visitCount', "shortenedUrls"."visitCount"
        )) as "shortenedUrls"
    FROM 
        users 
        INNER JOIN "shortenedUrls" ON users.id = "shortenedUrls"."userId"
    WHERE 
        users.id = $1
    GROUP BY 
        users.id
    `,
      [userIdValue]
    );

    res.status(200).send(userData.rows[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
}

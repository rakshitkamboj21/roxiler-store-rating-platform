import pool from "../config/db.js";

export const getStores = async (
  userId,
  search,
  sortBy,
  order,
  limit,
  offset
) => {
  let query = `
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      COALESCE(ROUND(AVG(r.rating),2),0) AS overall_rating,

      (
        SELECT rating
        FROM ratings
        WHERE store_id = s.id
        AND user_id = $1
      ) AS user_rating

    FROM stores s

    LEFT JOIN ratings r
    ON s.id = r.store_id

    WHERE 1=1
  `;

  const values = [userId];
  let index = 2;

  if (search) {
    query += `
      AND (
        s.name ILIKE $${index}
        OR s.address ILIKE $${index}
      )
    `;

    values.push(`%${search}%`);
    index++;
  }

  query += `
    GROUP BY s.id
    ORDER BY ${sortBy} ${order}
    LIMIT $${index}
    OFFSET $${index + 1}
  `;

  values.push(limit);
  values.push(offset);

  const result = await pool.query(query, values);

  return result.rows;
};
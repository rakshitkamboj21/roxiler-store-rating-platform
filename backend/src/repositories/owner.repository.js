import pool from "../config/db.js";

export const getOwnerDashboard = async (ownerId) => {
  const result = await pool.query(
    `
    SELECT
      s.id,
      s.name,

      COALESCE(ROUND(AVG(r.rating),2),0) AS average_rating,

      json_agg(
        json_build_object(
          'name',u.name,
          'email',u.email,
          'rating',r.rating
        )
      ) FILTER (WHERE u.id IS NOT NULL) AS users

    FROM stores s

    LEFT JOIN ratings r
      ON s.id=r.store_id

    LEFT JOIN users u
      ON r.user_id=u.id

    WHERE s.owner_id=$1

    GROUP BY s.id
    `,
    [ownerId]
  );

  return result.rows[0];
};
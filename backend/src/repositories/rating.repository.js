import pool from "../config/db.js";

// Check if user has already rated this store
export const findRating = async (userId, storeId) => {
  const result = await pool.query(
    `
    SELECT * FROM ratings
    WHERE user_id = $1
    AND store_id = $2
    `,
    [userId, storeId]
  );

  return result.rows[0];
};

// Create Rating
export const createRating = async (
  userId,
  storeId,
  rating
) => {
  const result = await pool.query(
    `
    INSERT INTO ratings(user_id,store_id,rating)
    VALUES($1,$2,$3)
    RETURNING *
    `,
    [userId, storeId, rating]
  );

  return result.rows[0];
};

// Update Rating
export const updateRating = async (
  userId,
  storeId,
  rating
) => {
  const result = await pool.query(
    `
    UPDATE ratings
    SET rating = $1
    WHERE user_id = $2
    AND store_id = $3
    RETURNING *
    `,
    [rating, userId, storeId]
  );

  return result.rows[0];
};
export const findStoreById = async (storeId) => {
  const result = await pool.query(
    `
    SELECT id
    FROM stores
    WHERE id = $1
    `,
    [storeId]
  );

  return result.rows[0];
};
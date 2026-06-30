import pool from "../config/db.js";

// =========================
// Find User By Email
// =========================
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT * FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0];
};

// =========================
// Find User By ID
// =========================
export const findUserById = async (userId) => {
  const result = await pool.query(
    `
    SELECT * FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
};

// =========================
// Create User
// =========================
export const createUser = async (
  name,
  email,
  password,
  address,
  role
) => {
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,address,role)
    VALUES($1,$2,$3,$4,$5)
    RETURNING id,name,email,address,role
    `,
    [name, email, password, address, role]
  );

  return result.rows[0];
};

// =========================
// Update Password
// =========================
export const updatePassword = async (userId, password) => {
  await pool.query(
    `
    UPDATE users
    SET password = $1
    WHERE id = $2
    `,
    [password, userId]
  );
};
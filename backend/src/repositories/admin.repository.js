import pool from "../config/db.js";

// =========================
// Create User
// =========================
export const createAdminUser = async (
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
// Create Store
// =========================
export const createStore = async (
  name,
  email,
  address,
  ownerId
) => {
  const result = await pool.query(
    `
    INSERT INTO stores(name,email,address,owner_id)
    VALUES($1,$2,$3,$4)
    RETURNING *
    `,
    [name, email, address, ownerId]
  );

  return result.rows[0];
};
export const getDashboardStats = async () => {
  const totalUsers = await pool.query(
    "SELECT COUNT(*) FROM users"
  );

  const totalStores = await pool.query(
    "SELECT COUNT(*) FROM stores"
  );

  const totalRatings = await pool.query(
    "SELECT COUNT(*) FROM ratings"
  );

  return {
    totalUsers: Number(totalUsers.rows[0].count),
    totalStores: Number(totalStores.rows[0].count),
    totalRatings: Number(totalRatings.rows[0].count),
  };
};
export const getAllUsers = async (
  search,
  role,
  sortBy,
  order,
  limit,
  offset
) => {
  let query = `
    SELECT id, name, email, address, role
    FROM users
    WHERE 1=1
  `;

  const values = [];
  let index = 1;

  if (search) {
    query += `
      AND (
        name ILIKE $${index}
        OR email ILIKE $${index}
        OR address ILIKE $${index}
      )
    `;
    values.push(`%${search}%`);
    index++;
  }

  if (role) {
    query += ` AND role = $${index}`;
    values.push(role);
    index++;
  }

  query += ` ORDER BY ${sortBy} ${order}`;

  query += ` LIMIT $${index} OFFSET $${index + 1}`;

  values.push(limit);
  values.push(offset);

  const users = await pool.query(query, values);

  // Total Count
  let countQuery = `
    SELECT COUNT(*) FROM users
    WHERE 1=1
  `;

  const countValues = [];
  let countIndex = 1;

  if (search) {
    countQuery += `
      AND (
        name ILIKE $${countIndex}
        OR email ILIKE $${countIndex}
        OR address ILIKE $${countIndex}
      )
    `;
    countValues.push(`%${search}%`);
    countIndex++;
  }

  if (role) {
    countQuery += ` AND role = $${countIndex}`;
    countValues.push(role);
  }

  const total = await pool.query(countQuery, countValues);

  return {
    users: users.rows,
    total: Number(total.rows[0].count),
  };
};
export const getAllStores = async (
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
      COALESCE(ROUND(AVG(r.rating),2),0) AS rating
    FROM stores s
    LEFT JOIN ratings r
      ON s.id = r.store_id
    WHERE 1=1
  `;

  const values = [];
  let index = 1;

  if (search) {
    query += `
      AND (
        s.name ILIKE $${index}
        OR s.email ILIKE $${index}
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

  const stores = await pool.query(query, values);

  // Count Query
  let countQuery = `
    SELECT COUNT(*) FROM stores
    WHERE 1=1
  `;

  const countValues = [];
  let countIndex = 1;

  if (search) {
    countQuery += `
      AND (
        name ILIKE $${countIndex}
        OR email ILIKE $${countIndex}
        OR address ILIKE $${countIndex}
      )
    `;

    countValues.push(`%${search}%`);
  }

  const total = await pool.query(countQuery, countValues);

  return {
    stores: stores.rows,
    total: Number(total.rows[0].count),
  };
};
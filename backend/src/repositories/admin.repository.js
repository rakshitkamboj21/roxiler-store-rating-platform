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
    SELECT *
    FROM users
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

// =========================
// Dashboard
// =========================
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

// =========================
// Get All Users
// =========================
export const getAllUsers = async (
  search,
  role,
  sortBy,
  order,
  limit,
  offset
) => {
  let query = `
    SELECT
      id,
      name,
      email,
      address,
      role
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

  // Count

  let countQuery = `
    SELECT COUNT(*)
    FROM users
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

  const total = await pool.query(
    countQuery,
    countValues
  );

  return {
    users: users.rows,
    total: Number(total.rows[0].count),
  };
};

// =========================
// Get All Stores
// =========================
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
      s.owner_id,
      u.name AS owner_name,
      COALESCE(ROUND(AVG(r.rating),2),0) AS rating

    FROM stores s

    LEFT JOIN users u
      ON s.owner_id = u.id

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
        OR u.name ILIKE $${index}
      )
    `;

    values.push(`%${search}%`);
    index++;
  }

  query += `
    GROUP BY
      s.id,
      s.name,
      s.email,
      s.address,
      s.owner_id,
      u.name

    ORDER BY ${sortBy} ${order}

    LIMIT $${index}
    OFFSET $${index + 1}
  `;

  values.push(limit);
  values.push(offset);

  const stores = await pool.query(query, values);

  // Count

  let countQuery = `
    SELECT COUNT(*)

    FROM stores s

    LEFT JOIN users u
      ON s.owner_id = u.id

    WHERE 1=1
  `;

  const countValues = [];
  let countIndex = 1;

  if (search) {
    countQuery += `
      AND (
        s.name ILIKE $${countIndex}
        OR s.email ILIKE $${countIndex}
        OR s.address ILIKE $${countIndex}
        OR u.name ILIKE $${countIndex}
      )
    `;

    countValues.push(`%${search}%`);
  }

  const total = await pool.query(
    countQuery,
    countValues
  );

  return {
    stores: stores.rows,
    total: Number(total.rows[0].count),
  };
};

// =========================
// Get User By ID
// =========================
export const getUserById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      u.id,
      u.name,
      u.email,
      u.address,
      u.role,
      COALESCE(ROUND(AVG(r.rating),2),0) AS rating

    FROM users u

    LEFT JOIN stores s
      ON s.owner_id = u.id

    LEFT JOIN ratings r
      ON r.store_id = s.id

    WHERE u.id = $1

    GROUP BY
      u.id,
      u.name,
      u.email,
      u.address,
      u.role
    `,
    [id]
  );

  return result.rows[0];
};

// =========================
// Update User
// =========================
export const updateUserById = async (
  id,
  name,
  email,
  address,
  role
) => {
  const result = await pool.query(
    `
    UPDATE users

    SET
      name=$1,
      email=$2,
      address=$3,
      role=$4

    WHERE id=$5

    RETURNING id,name,email,address,role
    `,
    [name, email, address, role, id]
  );

  return result.rows[0];
};

// =========================
// Delete User
// =========================
export const deleteUserById = async (
  id
) => {
  await pool.query(
    `
    DELETE FROM users
    WHERE id=$1
    `,
    [id]
  );
};

// =========================
// Get Store By ID
// =========================
export const getStoreById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      s.owner_id,
      u.name AS owner_name,
      COALESCE(ROUND(AVG(r.rating),2),0) AS rating

    FROM stores s

    LEFT JOIN users u
      ON s.owner_id = u.id

    LEFT JOIN ratings r
      ON s.id = r.store_id

    WHERE s.id=$1

    GROUP BY
      s.id,
      s.name,
      s.email,
      s.address,
      s.owner_id,
      u.name
    `,
    [id]
  );

  return result.rows[0];
};

// =========================
// Update Store
// =========================
export const updateStoreById = async (
  id,
  name,
  email,
  address,
  owner_id
) => {
  const result = await pool.query(
    `
    UPDATE stores

    SET
      name=$1,
      email=$2,
      address=$3,
      owner_id=$4

    WHERE id=$5

    RETURNING *
    `,
    [
      name,
      email,
      address,
      owner_id,
      id,
    ]
  );

  return result.rows[0];
};

// =========================
// Delete Store
// =========================
export const deleteStoreById = async (
  id
) => {
  await pool.query(
    `
    DELETE FROM stores
    WHERE id=$1
    `,
    [id]
  );
};

// =========================
// Get Store Owners
// =========================
export const getStoreOwners = async () => {
  const result = await pool.query(
    `
    SELECT
      id,
      name

    FROM users

    WHERE role='STORE_OWNER'

    ORDER BY name ASC
    `
  );

  return result.rows;
};
import bcrypt from "bcrypt";

import {
  createAdminUser,
  findUserByEmail,
  createStore,
  getDashboardStats,
  getAllUsers,
  getAllStores,
} from "../repositories/admin.repository.js";

// =========================
// Create User
// =========================
export const createUser = async (data) => {
  const { name, email, password, address, role } = data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createAdminUser(
    name,
    email,
    hashedPassword,
    address,
    role
  );

  return user;
};

// =========================
// Create Store
// =========================
export const addStore = async (data) => {
  const { name, email, address, owner_id } = data;

  const store = await createStore(
    name,
    email,
    address,
    owner_id
  );

  return store;
};

// =========================
// Dashboard
// =========================
export const getDashboard = async () => {
  return await getDashboardStats();
};

// =========================
// Get Users
// =========================
export const fetchUsers = async (query) => {
  const {
    search = "",
    role = "",
    page = 1,
    limit = 10,
  } = query;

  // Allowed sorting fields
  const allowedSortFields = [
    "id",
    "name",
    "email",
    "address",
    "role",
  ];

  // Validate sortBy
  const sortBy = allowedSortFields.includes(query.sortBy)
    ? query.sortBy
    : "id";

  // Validate order
  const order =
    query.order?.toUpperCase() === "DESC"
      ? "DESC"
      : "ASC";

  const offset = (page - 1) * limit;

  return await getAllUsers(
    search,
    role,
    sortBy,
    order,
    Number(limit),
    Number(offset)
  );
};

// =========================
// Get Stores
// =========================
export const fetchStores = async (query) => {
  const {
    search = "",
    page = 1,
    limit = 10,
  } = query;

  // Allowed sorting fields
  const allowedSortFields = [
    "id",
    "name",
    "email",
    "address",
    "rating",
  ];

  // Validate sortBy
  const sortBy = allowedSortFields.includes(query.sortBy)
    ? query.sortBy
    : "id";

  // Validate order
  const order =
    query.order?.toUpperCase() === "DESC"
      ? "DESC"
      : "ASC";

  const offset = (page - 1) * limit;

  return await getAllStores(
    search,
    sortBy,
    order,
    Number(limit),
    Number(offset)
  );
};
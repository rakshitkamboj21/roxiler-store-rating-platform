import bcrypt from "bcrypt";

import {
  createAdminUser,
  findUserByEmail,
  createStore,
  getDashboardStats,
  getAllUsers,
  getAllStores,
  getUserById,
  updateUserById,
  deleteUserById,
  getStoreOwners,

  // Store CRUD
  getStoreById,
  updateStoreById,
  deleteStoreById,
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

  const allowedSortFields = [
    "id",
    "name",
    "email",
    "address",
    "role",
  ];

  const sortBy = allowedSortFields.includes(query.sortBy)
    ? query.sortBy
    : "id";

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

  const allowedSortFields = [
    "id",
    "name",
    "email",
    "address",
    "rating",
  ];

  const sortBy = allowedSortFields.includes(query.sortBy)
    ? query.sortBy
    : "id";

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

// =========================
// Get Store Owners
// =========================
export const fetchStoreOwners = async () => {
  return await getStoreOwners();
};

// =========================
// Get User By ID
// =========================
export const fetchUserById = async (id) => {
  const user = await getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// =========================
// Update User
// =========================
export const editUser = async (id, data) => {
  const {
    name,
    email,
    address,
    role,
  } = data;

  return await updateUserById(
    id,
    name,
    email,
    address,
    role
  );
};

// =========================
// Delete User
// =========================
export const removeUser = async (id) => {
  await deleteUserById(id);
};

// =========================
// Get Store By ID
// =========================
export const fetchStoreById = async (id) => {
  const store = await getStoreById(id);

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

// =========================
// Update Store
// =========================
export const editStore = async (id, data) => {
  const {
    name,
    email,
    address,
    owner_id,
  } = data;

  return await updateStoreById(
    id,
    name,
    email,
    address,
    owner_id
  );
};

// =========================
// Delete Store
// =========================
export const removeStore = async (id) => {
  await deleteStoreById(id);
};
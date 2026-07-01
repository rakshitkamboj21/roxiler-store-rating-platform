import {
  createUser,
  addStore,
  getDashboard,
  fetchUsers,
  fetchStores,
  fetchUserById,
  editUser,
  removeUser,

  // Store CRUD
  fetchStoreById,
  editStore,
  removeStore,

  // Store Owners
  fetchStoreOwners,
} from "../services/admin.service.js";

// =========================
// Create User
// =========================
export const addUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Create Store
// =========================
export const createStore = async (req, res) => {
  try {
    const store = await addStore(req.body);

    res.status(201).json({
      success: true,
      message: "Store Created Successfully",
      store,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Dashboard
// =========================
export const dashboard = async (req, res) => {
  try {
    const data = await getDashboard();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get Users
// =========================
export const getUsers = async (req, res) => {
  try {
    const result = await fetchUsers(req.query);

    res.status(200).json({
      success: true,
      total: result.total,
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 10),
      users: result.users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get User By ID
// =========================
export const getUser = async (req, res) => {
  try {
    const user = await fetchUserById(req.params.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get Stores
// =========================
export const getStores = async (req, res) => {
  try {
    const result = await fetchStores(req.query);

    res.status(200).json({
      success: true,
      total: result.total,
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 10),
      stores: result.stores,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get Store Owners
// =========================
export const getStoreOwners = async (req, res) => {
  try {
    const owners = await fetchStoreOwners();

    res.status(200).json({
      success: true,
      owners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Update User
// =========================
export const updateUser = async (req, res) => {
  try {
    const user = await editUser(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Delete User
// =========================
export const deleteUser = async (req, res) => {
  try {
    await removeUser(req.params.id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get Store By ID
// =========================
export const getStore = async (req, res) => {
  try {
    const store = await fetchStoreById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      store,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Update Store
// =========================
export const updateStore = async (req, res) => {
  try {
    const store = await editStore(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Store Updated Successfully",
      store,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Delete Store
// =========================
export const deleteStore = async (req, res) => {
  try {
    await removeStore(req.params.id);

    res.status(200).json({
      success: true,
      message: "Store Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
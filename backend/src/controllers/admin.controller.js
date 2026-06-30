import { createUser, addStore,getDashboard,fetchUsers,fetchStores} from "../services/admin.service.js";

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
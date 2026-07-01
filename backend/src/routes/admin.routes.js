import express from "express";

import {
  addUser,
  createStore,
  dashboard,
  getUsers,
  getUser,
  getStores,
  updateUser,
  deleteUser,

  // Store CRUD
  getStore,
  updateStore,
  deleteStore,

  // Store Owners
  getStoreOwners,
} from "../controllers/admin.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

// =========================
// Create User
// =========================
router.post(
  "/users",
  authMiddleware,
  authorizeRoles("ADMIN"),
  addUser
);

// =========================
// Update User
// =========================
router.put(
  "/users/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateUser
);

// =========================
// Delete User
// =========================
router.delete(
  "/users/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  deleteUser
);

// =========================
// Get User By ID
// =========================
router.get(
  "/users/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getUser
);

// =========================
// Get Users
// =========================
router.get(
  "/users",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getUsers
);

// =========================
// Get Store Owners
// =========================
router.get(
  "/store-owners",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getStoreOwners
);

// ==================================================
// STORE ROUTES
// ==================================================

// Create Store
router.post(
  "/stores",
  authMiddleware,
  authorizeRoles("ADMIN"),
  createStore
);

// Get All Stores
router.get(
  "/stores",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getStores
);

// Get Store By ID
router.get(
  "/stores/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getStore
);

// Update Store
router.put(
  "/stores/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateStore
);

// Delete Store
router.delete(
  "/stores/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  deleteStore
);

// =========================
// Dashboard
// =========================
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("ADMIN"),
  dashboard
);

export default router;
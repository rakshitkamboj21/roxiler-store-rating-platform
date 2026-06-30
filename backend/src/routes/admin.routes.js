import express from "express";

import {
  addUser,
  createStore,
  dashboard,
  getUsers,
  getStores,
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
// Create Store
// =========================
router.post(
  "/stores",
  authMiddleware,
  authorizeRoles("ADMIN"),
  createStore
);
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("ADMIN"),
  dashboard
);
router.get(
  "/users",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getUsers
);
router.get(
  "/stores",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getStores
);
export default router;
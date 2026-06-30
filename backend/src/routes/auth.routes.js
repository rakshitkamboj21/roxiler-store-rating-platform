import express from "express";

import {
  register,
  login,
  updateUserPassword,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import { validateRegister } from "../middleware/validation.middleware.js";
const router = express.Router();

// =========================
// Public Routes
// =========================
router.post(
  "/register",
  validateRegister,
  register
);
router.post("/login", login);


// =========================
// Protected Routes
// =========================
router.put(
  "/change-password",
  authMiddleware,
  updateUserPassword
);

export default router;
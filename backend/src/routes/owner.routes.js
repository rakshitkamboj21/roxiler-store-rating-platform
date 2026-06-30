import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

import { dashboard } from "../controllers/owner.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("STORE_OWNER"),
  dashboard
);

export default router;
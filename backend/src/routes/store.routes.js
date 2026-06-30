import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { getAllStores } from "../controllers/store.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getAllStores);

export default router;
import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  addRating,
  editRating,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addRating);

router.put("/:storeId", authMiddleware, editRating);

export default router;
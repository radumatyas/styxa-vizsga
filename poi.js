import express from "express";
import {
  getAllInterestPoints,
  getInterestPointById,
  createInterestPoint,
  updateInterestPointById,
  deleteInterestPointById,
} from "../controllers/interestPointController.js";

const router = express.Router();

// 1. osszes lekerdezese
router.get("/", getAllInterestPoints);

// 2. lekerdezes id alapjan
router.get("/:id", getInterestPointById);

// 3. uj letrehozasa
router.post("/", createInterestPoint);

// 4. frissites id alapjan
router.put("/:id", updateInterestPointById);

// 5. torles id alapjan
router.delete("/:id", deleteInterestPointById);

export default router;

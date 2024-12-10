import express from "express";
import {
  getAllCities,
  getCityById,
  createCity,
  updateCityById,
  deleteCityById,
} from "../controllers/cityController.js";

const router = express.Router();

//1. osszes varos lekerdezese

router.get("/", getAllCities);

//2.varos lekerdezese id alapjan

router.get("/:id", getCityById);

//3. uj varos lehrehozasa

router.post("/", createCity);

//4.varos frissitese

router.put("/:id", updateCityById);

//5.varos torlese

router.delete("/:id", deleteCityById);

export default router;

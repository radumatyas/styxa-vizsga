import express from "express";
import {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountryById,
  deleteCountryById, // Javítva: deleteCountrtyById -> deleteCountryById
} from "../controllers/country.js";

const router = express.Router(); // Javítva: express.Router -> express.Router()

//1. osszes orszag
router.get("/", getAllCountries);

//2.ID szerint
router.get("/:id", getCountryById);

//3. uj orszag letrehozasa
router.post("/", createCountry);

//4.orszag frissitese
router.put("/:id", updateCountryById);

//5.orszag torlese
router.delete("/:id", deleteCountryById); // Javítva: deleteCountrtyById -> deleteCountryById

export default router;

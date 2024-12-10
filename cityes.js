/* eslint-disable prettier/prettier */
import express from "express";
import pool from "../db.js";

const router = express.Router();

// Új város létrehozása
router.post("/", async (req, res) => {
  const { name, description, population, country_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Cityes (Name, Description, Population, Country_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, population, country_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a város létrehozása közben" });
  }
});

// Városok lekérdezése
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Cityes");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Hiba történt a városok lekérdezése közben" });
  }
});

// Egy adott város lekérdezése
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM Cityes WHERE ID = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Város nem található" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a város lekérdezése közben" });
  }
});

// Város frissítése
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, population, country_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Cityes SET Name = $1, Description = $2, Population = $3, Country_id = $4 WHERE ID = $5 RETURNING *`,
      [name, description, population, country_id, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Város nem található" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a város frissítése közben" });
  }
});
// Város törlése
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM Cityes WHERE ID = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Város nem található" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Hiba történt a város törlése közben" });
  }
});

export default router;

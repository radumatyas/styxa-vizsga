import pool from "../../db.js"; //kapcsolat importalas
// orszoagok listazasa
export const listCountries = async () => {
  const query = "SELECT * FROM Country ";
  try {
    const result = await pool.query(query);
    return result.rows; // visszajonnek az 0sszes orszag adatai
  } catch (err) {
    throw new Error(" Error retrieving countries:" + err.message);
  }
};

// uj orszag hozzaadasa

export const insertCountry = async (name, description, latitude, longitude) => {
  const query = `
    INSERT INTO Country (Name, description, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING*
    `;
  try {
    const result = await pool.query(query, {
      name,
      description,
      latitude,
      longitude,
    });
    return result.rows[0]; // return the inserted country data
  } catch (err) {
    throw new Error("Error inserting country: " + err.message);
  }
};

// orszag frissitese
import { startArticleModule } from "./db/article.js";

startArticleModule();
export const updateCountry = async (
  id,
  name,
  description,
  latitude,
  longitude,
) => {
  const query = `
    UPDATE country 
    SET Name = $1, Description = $2, Latitude = $3, Longitude = $4
    WHERE ID = $5
    RETURNING *
    `;
  try {
    const result = await pool.query(query, [
      name,
      description,
      latitude,
      longitude,
      id,
    ]);
    if (result.rows.length === 0) {
      throw new Error("Country not found");
    }
    return result.rows[0]; //visszaterunk a friss orszag adataival
  } catch (err) {
    throw new Error(" Error updating country:" + err.message);
  }
};

// orszag torlese

export const deleteCountry = async (id) => {
  const query = `DELETE FROM Country WHERE ID = $1 RETURNING *`;
  try {
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw new Error("Country not found");
    }
    return result.rows[0]; // Visszatérünk a törölt ország adatával
  } catch (err) {
    throw new Error("Error deleting country: " + err.message);
  }
};

import express from "express";
import bodyParser from "body-parser";
import countryRouter from "./routes/country.js"; // Importáljuk a routert
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware-ek beállítása
app.use(bodyParser.json());

// Útvonalak beállítása
app.use("/api/countries", countryRouter);

// Alapértelmezett útvonal
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`Server is running on port ${3000}`);
});

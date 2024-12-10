import express from "express";
import { createUser } from "./db/user.js";
import { createCikkek } from "./db/article.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import { userRouter } from "./controllers/user.js";
import { countryRouter } from "./routs/category.js";
import { articleRouter } from "./controllers/article.js";
import cors from "cors";

const server = express();

const port = 3000; // barmi 1000 - 8000

server.use(cors());
server.use(bodyParser.json());

server.use(morgan("dev"));

// TODO: /auth

server.use("/users", userRouter);

server.use("/articles", articleRouter);

server.patch("/orszag", (req, res) => {
  res.send("orszag world ez az elso projektem");
});

server.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${3000} cimen`);
  createUser();
  createCikkek();
  // eslint-disable-next-line no-undef
  DeleteUsers();
});

import {
  GetCategory,
  AddCategory,
  UpdateCategory,
  DeleteCategory,
} from "./category.js";

const categoryRouter = express.Router();

categoryRouter.get("/", GetCategory);
categoryRouter.post("/", AddCategory);
categoryRouter.put("/", UpdateCategory);
categoryRouter.delete("/:id", DeleteCategory);

export { categoryRouter };

server.use("/categories", categoryRouter);

//orszagok

const app = express();
const PORT = 3000;

app.use(express.json());

//country router letrehozasa

app.use("/countries", countryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

//varosok

import cityRouter from "./controllers/cityes.js";

app.use(express.json());

// country router
app.use("/countries", countryRouter);

// City router hozzáadása
app.use("/cities", cityRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

//point of interest

import poiRouter from "./controllers/poi.js";

app.use(express.json());

// Country router hozzáadása
app.use("/countries", countryRouter);

// City router hozzáadása
app.use("/cities", cityRouter);

// PointOfInterest router hozzáadása
app.use("/pois", poiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

//routes
app.use("/countries", countryRouter);

// szerver inditasa

app.listen(PORT, () => {
  console.log(`Server running on port ${3000}`);
});

import citiesRouter from "./routes/cities.js";

app.use(express.json());

// Cities router
app.use("/cities", citiesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${3000}`);
});

import interestPointsRouter from "./routes/interestpoints.js";

app.use(express.json());

// Interest points router
app.use("/interestpoints", interestPointsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import database from "./src/config/database";
import Auth from "./src/routes/auth";
import Companies from "./src/routes/companies";
import Products from "./src/routes/products";
import Stats from "./src/routes/stats";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "30mb",
  })
);

app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

database();

app.use("/auth", Auth);
app.use("/companies", Companies);
app.use("/products", Products);
app.use("/stats", Stats);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

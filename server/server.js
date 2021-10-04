import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION FAILED", err));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is Running on port ${port}`));

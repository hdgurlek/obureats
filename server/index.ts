import routes from "./api";

const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");

const app = express();
const port = 3001;

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/store-app");

  app.use(express.json());
  app.use(routes());

  app.listen(port, () => {
    console.log(`Store-app listening on port ${port}`);
  });
}

main().catch((err) => console.log(err));

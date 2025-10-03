const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./configs/db.js");

app.use(express.json());

let PORT = process.env.PORT || 3000;
dotenv.config();

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running in the ${PORT}`);
});

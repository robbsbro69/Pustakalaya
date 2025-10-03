const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./configs/db.js");
const authRouter = require("./routes/auth.routes.js");

app.use(express.json());

let PORT = process.env.PORT || 3000;
dotenv.config();

app.use("/", authRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

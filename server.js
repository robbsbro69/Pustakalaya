const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./configs/db.js");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes.js");
const bookRouter = require("./routes/book.routes.js");

app.use(express.json());
app.use(cookieParser());

let PORT = process.env.PORT || 3000;
dotenv.config();

app.use("/auth", authRouter);
app.use("/books", bookRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

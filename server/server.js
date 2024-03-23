require("dotenv").config()
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const PORT = 5000;

//Middleware
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use(errorMiddleware)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is up and runinng at port:${PORT}`);
  });
});

const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const PORT = 5000;

//Middleware
app.use(express.json());

connectDB().then(() => {
  app.use("/api/auth", router);
  app.listen(PORT, () => {
    console.log(`server is up and runinng at port:${PORT}`);
  });
});

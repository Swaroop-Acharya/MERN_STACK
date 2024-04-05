require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const projectRoute = require("./router/project-router");
const adminRoute=require("./router/admin-router")
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATH,HEAD,PATCH",
  credentials: true,
};

//Middleware
//handling the cors error
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", projectRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is up and runinng at port:${PORT}`);
  });
});

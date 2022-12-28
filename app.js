const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

var cors = require("cors");
app.use(cors());

const port = process.env.PORT || 3000;
const userRoutes = require("./api/routes/userRoutes");
const adminRoutes = require("./api/routes/adminRoutes");
const matchRoutes = require("./api/routes/matchRoutes");
const staffRoutes = require("./api/routes/staffRoutes");
const stadiumRoutes = require("./api/routes/stadiumRoutes");
const customerRoutes = require("./api/routes/customerRoutes");
const teamRoutes = require("./api/routes/teamRoutes");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL_LOCAL);

mongoose.connection.on("connected", () => {
  console.log("mongodb connection established successfully");
});
mongoose.connection.on("error", () => {
  console.log("mongodb connection Failed");
  mongoose.connect(process.env.MONGO_URL_LOCAL);
});

app.use(express.json());

app.use(cors());

// Use body parser middleware to parse body of incoming requests
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log({ body: req.body });
  console.log({ query: req.query });
  console.log({ params: req.params });
  console.log({ params: req.headers });

  next();
});

// Routes which should handle requests
app.use("/api/admin", adminRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/stadium", stadiumRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/", userRoutes);
app.use("/api/", customerRoutes);

app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500).json({
    error,
  });
});

module.exports = app;

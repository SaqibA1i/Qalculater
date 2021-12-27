const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = new require("connect-mongo");
const connection = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: process.env.client,
    credentials: true
  })
);

// ******** DATABASE
//connect to it
connection();

//  ******* ROUTES
// Authentication Routes
server.use("/auth", require("./routes/auth"));
// Course Routes
server.use("/term", require("./routes/termRoutes"));

server.listen(process.env.PORT, () => {
  console.log("Listening on port:", process.env.PORT);
});

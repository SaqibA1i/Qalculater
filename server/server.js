const express = require("express");
const cors = require("cors");
const connection = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: [process.env.client, "http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
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

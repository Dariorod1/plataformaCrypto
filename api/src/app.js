const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const server = express();

require("./db.js");

//=====passport ====
const passport = require("./passport");
//const session = require("express-session");
//===================================================================
server.use(cors()); //{ origin: process.env.REACT_APP_FRONT, credentials: true }
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(passport.initialize());

server.all("*", function (req, res, next) {
  passport.authenticate("bearer", function (err, user) {
    if (err) return res.status(400).json({ message: "malformed JSON" });
    if (user) {
      req.user = user;
    }
    return next();
  })(req, res, next);
});

//server.use("/", routes);
server.use("/", routes);
// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error("soy el error en app.js", err);
  res.status(status).send(message);
});

module.exports = server;

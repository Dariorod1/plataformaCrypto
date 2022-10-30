const server = require("express").Router();

const { signIn, signUp } = require("../controllers/authController");

server.post("/signIn", signIn);
server.post("/signUp", signUp);
server.get("/google", (req, res) => {
  res.send(req.user);
});
module.exports = server;

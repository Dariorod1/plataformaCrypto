const server = require("express").Router();
const upload = require("./../libs/storage");
//Importamos las funciones
const {
  createProfe,
  deleteProfe,
  updateProfe,
  getAllProfesores,
  getImageProfile,
} = require("../controllers/profesorController");

//Definimos los llamados
server.get("/", getAllProfesores);
server.get("/picture/:name", getImageProfile);
server.post("/", upload.single("profilepic"), createProfe);
server.delete("/:id", deleteProfe);
server.patch("/:id", upload.single("profilepic"), updateProfe);

module.exports = server;

const { Op } = require("sequelize");
const { Profesor } = require("../db");
const path = require("path");
const fs = require("fs");

//Funcion que devuelve todos los usuarios de la DB
const getAllProfesores = async (req, res, next) => {
  try {
    const profes = await Profesor.findAll();
    res.json(profes);
  } catch (err) {
    res.json({
      data: [],
      message: "Algo esta mal",
    });
  }
};
//Función que crea un nuevo usuario
const createProfe = async (req, res, next) => {
  const { nombre, apellido, email } = req.body;
  if (req.file) {
    var profile = req.file.filename;
    console.log(profile);
  }
  try {
    let course = await Profesor.create({
      nombre,
      apellido,
      email,
      profilepic: profile,
    });
    return res.json({
      Porfesor: course,
      message: "Profesor dado de alta correctamente",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error al intentar dar de alta un profesor" });
  }
};
//Función que elimina un curso por su id.
const deleteProfe = async (req, res) => {
  try {
    const { id } = req.params;
    await Profesor.destroy({
      where: {
        id,
      },
    });
    res.json({ message: "Profesor eliminado" });
  } catch (e) {
    res.status(500).send(next);
  }
};

const updateProfe = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  let profeFind = await Profesor.findAll({ where: { id: id } });

  if (req.file) {
    var profile = req.file.filename;
    console.log(profile);
  }
  if (profeFind.length > 0) {
    profeFind.map(async (profe) => {
      await profe.update({
        nombre,
        email,
        profilepic: profile,
      });
    });
    return res.json({
      message: "Profe updated",
      date: profeFind,
    });
  }
};
const getImageProfile = (req, res) => {
  let getImage;
  const { name } = req.params;
  let pathImage = path.join(__dirname, "../../");
  try {
    getImage = fs.readFileSync(`${pathImage}uploads/${name}`);
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads/noImage.png`);
  }
  res.set({ "Content-Type": "image/png" });
  res.send(getImage);
};
module.exports = {
  getAllProfesores,
  createProfe,
  deleteProfe,
  updateProfe,
  getImageProfile,
};

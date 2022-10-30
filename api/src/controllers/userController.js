const {Op} = require('sequelize')
const { Usuario } = require("../db");
const path = require('path')
const fs = require('fs')
const multer = require('multer')


//Funcion que devuelve todos los usuarios de la DB
const getAllUsers = async(req,res,next) => {
try {
    const users = await Usuario.findAll();
    res.json(users)
} catch (err) {
    res.json({
        data: [],
        message: "Algo esta mal"
    })
}
}
//Función que crea un nuevo usuario
const createUser = async( req,res,next) => {
    const{nombre,apellido,domicilio,fechanac,dni} = req.body;
    try {
        let user = await Usuario.create({
            nombre,
            apellido,
            domicilio,
            fechanac,
            dni
        });
        return res.json({Usuario: user, message: "Usuario dado de alta correctamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error al ingresar un usuario"})
    }
}
//Función que elimina un usuario por su id.
const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        await Usuario.destroy({
            where: {
                id,
            },
        });
        res.json({ message: "Usuario eliminado" });
    } catch (e) {
        res.status(500).send(next);
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre,apellido } = req.body;
    let userFind = await Usuario.findAll({ where: { id: id } });
  
    if (req.file) {
      var profile = req.file.filename;
      console.log(profile);
    }
    if (userFind.length > 0) {
      userFind.map(async (user) => {
        await user.update({
          nombre,
          apellido,
          profilepic: profile,
        });
      });
      return res.json({
        message: "User updated",
        date: userFind,
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
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    getImageProfile
}
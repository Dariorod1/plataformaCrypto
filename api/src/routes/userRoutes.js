const server = require('express').Router();
const upload = require('./../libs/storage')
//Importamos las funciones
const {
    getAllUsers,createUser,deleteUser,uploadImagen,updateUser,getImageProfile
} = require('../controllers/userController')



//Definimos los llamados
server.get("/",getAllUsers);
server.get('/picture/:name', getImageProfile)
server.post("/" , createUser);
server.delete("/:id",deleteUser);
server.patch("/:id",upload.single("profilepic"),updateUser);

module.exports = server;
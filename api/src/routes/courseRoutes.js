const server = require('express').Router();
const upload = require('./../libs/storage')
//iImportamos los controllers
const {createCourse,deleteCourse,getAllCourses,updateCourse,getImageProfile} = require('../controllers/courseController')


//Definimos las rutas

server.get("/",getAllCourses);
server.get('/picture/:name', getImageProfile)
server.post("/",upload.single("imagen"),createCourse);
server.delete("/:id",deleteCourse);
server.patch("/:id",upload.single("imagen"),updateCourse)
module.exports = server;
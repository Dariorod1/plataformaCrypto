const {Op} = require('sequelize')
const { Curso } = require("../db");
const path = require('path')
const fs = require('fs')


//Funcion que devuelve todos los usuarios de la DB
const getAllCourses = async(req,res,next) => {
    try {
        const courses = await Curso.findAll();
        res.json(courses)
    } catch (err) {
        res.json({
            data: [],
            message: "Algo esta mal"
        })
    }
}
const getCoursesById = async(req,res,next) => {
    const id = req.params
    try {
        const curso = await Curso.findOne({where:id})
        res.json(curso)
    } catch (error) {
        return next(error)
    }
}
    //Función que crea un nuevo usuario
const createCourse = async(req,res,next) => {
    const{nombre,precio,duracion,categoria,profesor,modulos,contenido,descripcion} = req.body;
    if (req.file) {
        var profile = req.file.filename;
        console.log(profile);
      }
    try {
        let course = await Curso.create({
            nombre,
            precio,
            duracion,
            categoria,
            profesor,
            imagen: profile,
            modulos,
            contenido,
            descripcion
        });
        return res.json({Curso: course, message: "Curso dado de alta correctamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error al intentar dar de alta un curso"})
    }
}
//Función que elimina un curso por su id.
const deleteCourse = async (req,res) => {
    try {
        const { id } = req.params;
        await Course.destroy({
            where: {
                id,
            },
        });
        res.json({ message: "Curso eliminado" });
    } catch (e) {
        res.status(500).send(next);
    }
}

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { duracion,precio,modulos,contenido,descripcion } = req.body;
    let courseFind = await Curso.findAll({ where: { id: id } });
  
    if (req.file) {
      var profile = req.file.filename;
      console.log(profile);
    }
    if (courseFind.length > 0) {
        courseFind.map(async (course) => {
        await course.update({
          precio,
          duracion,
          imagen: profile,
          modulos,
          contenido,
          descripcion
        });
      });
      return res.json({
        message: "Course updated",
        date: courseFind,
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
    getAllCourses,
    createCourse,
    deleteCourse,
    updateCourse,
    getImageProfile,
    getCoursesById
}
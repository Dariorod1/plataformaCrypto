const { Usuario } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config");
//const Usuario = require("../models/Usuario");

module.exports = {
  //Login con google
  signInWithGoogle(req,res){
    
  },
  // Login
  signIn(req, res) {
    let { email, contraseña } = req.body;
    console.log(req.body);
    // Buscar usuario
    Usuario.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ msg: "Usuario con este correo no encontrado" });
        } else {
          if (bcrypt.compareSync(contraseña, user.password)) {
            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });

            res.json({
              user: user,
              token: token,
            });
          } else {
            // Unauthorized Access
            res.status(401).json({ msg: "Contraseña incorrecta" });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // Registro
  signUp(req, res) {
    // Encriptamos la contraseña
    const { nombre, apellido, email, contraseña } = req.body;
    console.log("bodyy", req.body);
    let password = bcrypt.hashSync(
      contraseña,
      10,
      Number.parseInt(authConfig.rounds)
    );

    // Crear un usuario
    Usuario.create({
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
    })
      .then((user) => {
        // Creamos el token
        let token = jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });

        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Contraseña jajaja" });
      });
  },
};

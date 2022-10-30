// const { DataTypes, } = require("sequelize");

// module.exports = (sequelize) => {
//     sequelize.define("usuario", {
//         nombre: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         apellido: {
//             type: DataTypes.STRING,
//         },
//         domicilio: {
//             type: DataTypes.STRING,
//         },
//         fechanac: {
//             type: DataTypes.DATE,
//         },
//         dni: {
//             type: DataTypes.INTEGER
//         },
//         profilepic: {
//             type: DataTypes.STRING,
//             allowNull : true
//         }
//     }, { timestamps: false });
// };

//'use strict';
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Usuario = sequelize.define("usuario", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que tener minimamente 6 caracteres",
        },
      },
    },
    //cuando el usuario se registra con google, recibo el ID de Google
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    profilepic: {
      type: DataTypes.STRING,
    },
    //Valor logico para saber si es premium o no, al registrar siempre será false
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    //id de mercado pago al momento de hacerse premium
    mp_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    //link de pago
    payment_link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: true,
    },
    //fecha de pago
    order_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    //estado del pago
    order_status: {
      type: DataTypes.ENUM("cancelled", "completed", "processing"),
      allowNull: false,
      defaultValue: "processing",
    },
    reset_code: {
      type: DataTypes.STRING,
      set(value) {
        if (value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("reset_code", hash);
        }
      },
    },
  });

  Usuario.prototype.compare = function (password, isReset) {
    //compares resetcode when isReset is true
    if (this.password || this.reset_code)
      return bcrypt.compareSync(
        password.toString(),
        isReset ? this.reset_code : this.password
      );
    else return false;
  };
  return Usuario;
};

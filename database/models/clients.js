'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*
      models.Clients.hasMany(models.Savings,
       {
          as: "savinegs",
          foreignKey: "clientId"
        });
        */
      }
  }
  Clients.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Es obligatorio agregar un nombre',
        },
        isAlpha: {
          msg: 'El nombre debe contener sólo letras',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Es obligatorio agregar un apellido',
        },
        isAlpha: {
          msg: 'El apellido debe contener sólo letras',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
        msg: 'Es obligatorio agregar un email',
      },
      // is: {
      //   args: ['^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$'],
      //   msg: 'Debe ingresar un email válido'
      // }
      isEmail: {
        args: true,
        msg: 'Email no válido'
      },
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Clients',
  });
  return Clients;
};
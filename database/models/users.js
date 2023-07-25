'use strict';
import bcrypt from 'bcrypt';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Users extends Model {

    static associate(models) {
      
      models.Users.hasMany(models.Savings,
        {
          as: "savinegs",
          foreignKey: "clientId"
        }); 
      
    }
  }

  Users.init({
    name: {
      type: DataTypes.STRING(64),
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
      type: DataTypes.STRING(64),
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
      type: DataTypes.STRING(128),
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
    password: DataTypes.STRING(255),
    rol: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });

  Users.prototype.isValidPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  }
  return Users;
};
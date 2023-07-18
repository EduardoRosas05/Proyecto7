'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Savings extends Model {
    static associate(models) {
      Savings.belongsTo(models.Users, {
        foreignKey: 'usersId',
        as: 'user',
      });
    }
  }

  Savings.init({
    concepto: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'el concepto es obligatorio'
        },
        isAlpha:{
          msg: 'el concepto solo debe contener letras'
         },
       }
    }, 
      monto: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
          notNull:{
            msg: 'el monto es obligatorio'
          },
          isNumeric: {
            msg: 'ingresa solo numeros'
          }
        }
    },
    balance:DataTypes.STRING,
    usersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Savings',
  });
  return Savings;
};
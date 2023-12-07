'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Savings extends Model {
    static associate(models) {
      //models.Savings.belongsTo(models.Clients,
      models.Savings.belongsTo(models.User,
        {
          as: 'client',
          foreignKey: 'clientId'
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
    clientId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Savings',
  });
  return Savings;
};
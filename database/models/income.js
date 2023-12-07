'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    static associate(models) {
      
      models.Income.belongsTo(models.User,
        {
          as: 'client',
          foreignKey: 'clientId'
        }); 
    }
  }
  Income.init({
    description: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'la descripción es obligatoria'
        },
      }
    }, 
    acount: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'la cuenta es obligatoria'
        },
        isNumeric: {
          msg: 'ingresa solo numeros'
        }
      }
    },
    balance: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Savings extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Savings.init({
    concepto: DataTypes.STRING,
    monto: DataTypes.STRING,
    balance: DataTypes.STRING,
    usersId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Savings',
  });
  return Savings;
};
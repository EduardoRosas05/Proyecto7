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
    name: DataTypes.STRING(64),
    username: DataTypes.STRING(64),
    email: DataTypes.STRING(128),
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
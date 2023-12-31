'use strict';
import mysql2 from "mysql2";
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
  if(config.dialect === "mysql"){
    config.dialectModule = mysql2
  }
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


import income from './income';
import category from './category';
import savings from './savings';
// import clients from './clients';
import user from './user';
import role from './role'


db.Income = income(sequelize, Sequelize.DataTypes);
db.Category = category(sequelize, Sequelize.DataTypes);
db.Savings = savings(sequelize, Sequelize.DataTypes);
// db.Clients = clients(sequelize, Sequelize.DataTypes);

db.User = user(sequelize, Sequelize.DataTypes);
db.Role = role(sequelize, Sequelize.DataTypes)
/*
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
  */

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Category extends Model {  
    static associate(models) {

      models.Category.hasMany(models.Income,
        {
          as: "categor",
        }); 
    }
  }
  Category.init({
    name:  {
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
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
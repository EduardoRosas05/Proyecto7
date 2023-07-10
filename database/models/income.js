'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      

      models.Income.belongsTo(models.Category,
        {
          as: 'incomes',
          foreignKey: 'categoryId'
        }); 

    }
  }
  Income.init({
    description: DataTypes.STRING,
    acount: DataTypes.STRING,
    balance: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    usersId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Income',
  });
  return Income;
};
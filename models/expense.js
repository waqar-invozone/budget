'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.belongsTo('User');
    }
  }
  Expense.init(
    {
      type: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Expense',
    }
  );
  return Expense;
};

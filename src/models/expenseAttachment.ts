'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class ExpenseAttachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Expense, { foreignKey: 'expenseId' });
    }
  }
  ExpenseAttachment.init(
    {
      filePath: DataTypes.STRING,
      expenseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ExpenseAttachment',
    }
  );
  return ExpenseAttachment;
};

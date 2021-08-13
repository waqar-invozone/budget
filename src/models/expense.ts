'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      this.belongsToMany(models.User, { through: 'ExpenseUser' });
      this.hasMany(models.ExpenseAttachment, { foreignKey: 'expenseId' });
    }
  }
  Expense.init(
    {
      type: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (obj, options) => {
          console.log('before create');
        },
        afterCreate: (obj, options) => {
          console.log('created !!');
        },
      },
      sequelize,
      modelName: 'Expense',
    }
  );
  return Expense;
};

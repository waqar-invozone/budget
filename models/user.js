'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Expense, {
        as: 'ExpenseCreated',
        foreignKey: 'CreatedBy',
      });
      this.hasMany(models.Group, {
        as: 'GroupCreated',
        foreignKey: 'CreatedBy',
      });

      this.belongsToMany(models.Expense, { through: 'ExpenseUser' });
      this.belongsToMany(models.Group, { through: 'GroupUser' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avator: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};

'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      this.belongsToMany(models.User, {
        as: 'users',
        through: 'GroupUser',
        foreignKey: 'groupId',
        otherKey: 'userId',
      });
    }
  }
  Group.init(
    {
      name: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Group',
    }
  );
  return Group;
};

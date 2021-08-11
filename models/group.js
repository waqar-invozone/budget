'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { as: 'creator', foreignKey: 'createdBy' });
      this.belongsToMany(models.User, { through: 'GroupUser' });
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

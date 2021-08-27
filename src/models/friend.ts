'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    static associate(models) {}
  }
  Friend.init(
    {
      friendId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Friend',
    }
  );
  return Friend;
};

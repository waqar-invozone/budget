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
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'accept', 'reject'],
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Friend',
      timestamps: false,
    }
  );
  Friend.removeAttribute('id');
  return Friend;
};

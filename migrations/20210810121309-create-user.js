'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avator: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      apiToken: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // const transaction = await queryInterface.sequelize.transaction();
    // try {
    //   await queryInterface.addIndex('email_index', {
    //     fields: 'email',
    //     unique: true,
    //     transaction,
    //   });
    //   await transaction.commit();
    // } catch (err) {
    //   await transaction.rollback();
    //   throw err;
    // }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};

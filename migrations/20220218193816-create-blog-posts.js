'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPosts = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' }
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
        type:Sequelize.DATE,
        allowNull: false,
      },
    });
    return BlogPosts;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};

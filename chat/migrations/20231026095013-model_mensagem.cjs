'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Mensagem", {
      mensagemId: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      emissorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      receptorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true
      },
      conteudo: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      dataEnvio: {
          type: Sequelize.DATE,
          allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

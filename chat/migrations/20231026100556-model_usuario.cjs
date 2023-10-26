'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Usuario", {
      usuarioId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
          type: Sequelize.STRING,
          allowNull: false
      },
      senha: {
          type: Sequelize.STRING,
          allowNull: false
      },
      apelido: {
          type: Sequelize.STRING,
          allowNull: false
      },
      tipo: {
          type: Sequelize.ENUM,
          values: ["viajante", "representante_localidade"]
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

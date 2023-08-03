'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dokumens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_mbkm: {
        type: Sequelize.STRING
      },
      nama_file: {
        type: Sequelize.STRING
      },
      lokasi_file: {
        type: Sequelize.STRING
      },
      id_dosen: {
        type: Sequelize.STRING
      },
      program_studi: {
        type: Sequelize.STRING
      },
      fakultas: {
        type: Sequelize.STRING
      },
      semester: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dokumens');
  }
};
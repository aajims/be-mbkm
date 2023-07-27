'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mbkms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_mbkm: {
        type: Sequelize.STRING
      },
      jenis_mbkm: {
        type: Sequelize.STRING
      },
      id_lembaga: {
        type: Sequelize.INTEGER
      },
      tgl_mulai: {
        type: Sequelize.DATE
      },
      tgl_selesai: {
        type: Sequelize.DATE
      },
      id_admin: {
        type: Sequelize.STRING
      },
      id_dok: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Mbkms');
  }
};
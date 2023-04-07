'use strict';
const {
  Model
} = require('sequelize');
const belajar = require('./belajar');
module.exports = (sequelize, DataTypes) => {
  class Mbkm extends Model{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mbkm.init({
    nama_mbkm: DataTypes.STRING,
    jenis_mbkm: DataTypes.STRING,
    id_lembaga: DataTypes.INTEGER,
    tgl_mulai: DataTypes.DATE,
    tgl_selesai: DataTypes.DATE,
    id_admin: DataTypes.INTEGER,
    id_dok: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mbkm',
  });
  
  return Mbkm;
};

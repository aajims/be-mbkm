'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dokumen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dokumen.init({
    id_mbkm: DataTypes.STRING,
    file: DataTypes.STRING,
    lokasi_file: DataTypes.STRING,
    id_dosen: DataTypes.STRING,
    program_studi: DataTypes.STRING,
    fakultas: DataTypes.STRING,
    semester: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dokumen',
  });
  return dokumen;
};
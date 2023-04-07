'use strict';
const {
  Model
} = require('sequelize');
const Mbkm = require("./mbkm")
const User = require("./user")
module.exports = (sequelize, DataTypes) => {
  class belajar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  belajar.init({
    id_mbkm: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'belajar',
  });
  
  return belajar;
};
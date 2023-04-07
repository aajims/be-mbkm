// const { Model } = require('sequelize');
const sequelize = require('sequelize');
const db = new sequelize('dbriko_mbkm', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;
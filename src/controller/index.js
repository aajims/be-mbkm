const roles = require('./roles');
const users = require('./users');
const mbkm = require('./mbkm');
const lembaga = require('./lembaga');
const belajar = require('./belajar');
const dokumen = require('./dokumen');
const controller = {};

controller.users = users;
controller.roles = roles;
controller.mbkm = mbkm;
controller.lembaga = lembaga;
controller.belajar = belajar;
controller.dokumen = dokumen;

module.exports = controller;
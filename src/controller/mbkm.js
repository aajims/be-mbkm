const { Mbkm, Lembaga, User } = require('../../models');
const controller = {};
const jwt = require('jsonwebtoken');

const Validator = require("fastest-validator");
const v = new Validator();
const { Op } = require('sequelize');

controller.getAll = async function (req, res) {
    const getPagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
      };
    const getPagingData = (data, page, limit) => {
        const { totalItems, rows } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, rows, totalPages, currentPage };
      };
    const { page, size, name } = req.query;
    var condition = name ? { nama_mbkm: { [Op.like]: `%${name}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    try {
        Mbkm.belongsTo(Lembaga, {foreignKey: 'id_lembaga'})
        Mbkm.belongsTo(User, {foreignKey: 'id_admin'})
        await Mbkm.findAll({ where: condition, limit, offset, include:[
            {
                model: Lembaga,
                attributes: ['nama'],
                required: false
            },
            {
                model: User,
                attributes: ['name'],
                required: false
            }
        ] })
        .then ((result) => {
            const data = { totalItems: result.length, rows: result }
            const dataResult = getPagingData(data, page, limit);
            res.status(200).json({
                message: 'success show data Mbkm',
                data: dataResult
            })
           
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}


controller.getById = async function (req, res) {
    const id = req.params.id
    try {
        Mbkm.belongsTo(Lembaga, {foreignKey: 'id_lembaga'})
        Mbkm.belongsTo(User, {foreignKey: 'id_admin'})
        await Mbkm.findByPk((id),{include: [
            {
                model: Lembaga,
                attributes: ['nama'],
                required: false
            },
            {
                model: User,
                attributes: ['name'],
                required: false
            }
        ]})
        .then ((result) => {
            res.status(200).json({
                message: 'success view detail data Mbkm',
                data: result
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

controller.createNewMbkm = async function (req, res) {
    const data = {
        nama_mbkm: req.body.nama_mbkm,
        jenis_mbkm : req.body.jenis_mbkm,
        id_lembaga : req.body.id_lembaga,
        tgl_mulai : req.body.tgl_mulai,
        tgl_selesai : req.body.tgl_selesai,
        id_user : req.user.userid,
        id_dok : req.body.id_dok
    }
    const schema = {
        nama_mbkm : { type: "string", min: 5, max: 30, optional: false },
        jenis_mbkm : { type: "string", max: 30 },
    }
    const validationResult = v.validate(data, schema);
    if (validationResult !== true) {
        // -- Data tidak valid
        res.status(400).json({
            message : 'Validation Failed',
            data: validationResult
        });
    } else {
        try {
            await Mbkm.create(data)
            .then ((result) => {
                res.status(200).json({
                    message: 'success insert data Mbkm',
                    data: result
                })
            })
        } catch (error) {
            res.status(401).json({
                message: error
            })
        }
    }
}

controller.update = async function (req, res) {
    const data = {
        nama_mbkm: req.body.nama_mbkm,
        jenis_mbkm : req.body.jenis_mbkm,
        id_lembaga : req.body.id_lembaga,
        tgl_mulai : req.body.tgl_mulai,
        tgl_selesai : req.body.tgl_selesai,
        id_admin : req.user.userid,
        id_dok : req.body.id_dok
    }
    const schema = {
        nama_mbkm : { type: "string", min: 5, max: 30, optional: false },
        jenis_mbkm : { type: "string", max: 30 },
    }

    const validationResult = v.validate(data, schema);
    if (validationResult !== true) {
        // -- Data tidak valid
        res.status(400).json({
            message : 'Validation Failed',
            data: validationResult
        });
    } else {
    try {
        await Mbkm.update(data, {where : {id : req.params.id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Update data Mbkm',
                data: data
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
  }
}

controller.delete = async function (req, res) {
    const id = req.params.id
    try {
        await Mbkm.destroy(id)
        .then ((result) => {
            res.status(200).json({
                message: 'success Delete data Mbkm',
                data: result
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

module.exports = controller;
const { belajar, Mbkm, User } = require('../../models');
const controller = {};

const Validator = require("fastest-validator");
const v = new Validator();

controller.getAll = async function (req, res) {
    const idMbkm = req.query.id_mbkm
    var condition = idMbkm ? {id_mbkm: idMbkm} : null;
    try {
        belajar.belongsTo(Mbkm, {foreignKey: 'id_mbkm'})
        belajar.belongsTo(User, {foreignKey: 'id_user'})
        await belajar.findAll({where: condition, include:[
            {
                model: Mbkm,
                attributes: ['nama_mbkm'],
                required: false
            },
            {
                model: User,
                attributes: ['name'],
                required: false
            }
        ]})
        .then ((result) => {
            if(result.length > 0) {
                res.status(200).json({
                    message: 'success show data Belajar',
                    data: result
                })
            } else {
                res.status(200).json({
                    message: 'tidak ada data Belajar',
                    data: []
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: error
        })
    }
}

controller.getById = async function (req, res) {
    const id = req.params.id
    try {
        belajar.belongsTo(User, {foreignKey: 'id_user'})
        belajar.belongsTo(Mbkm, {foreignKey: 'id_mbkm'})
        await belajar.findOne({where:{id: id}, include:
            [{
                model: User,
                attributes: ['name'],
                required: false
            },
            {
                model: Mbkm,
                attributes: ['nama_mbkm'],
                required: false
            },
        ]})
        .then ((result) => {
            res.status(200).json({
                message: 'success view detail data Belajar',
                data: result
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

controller.insert = async function (req, res) {
    const data = {
        id_mbkm : req.body.id_mbkm,
        id_user : req.user.userid,
        id_role : req.user.userRole,
        periode_kegiatan : req.body.periode_kegiatan,
        rincian_kegiatan : req.body.rincian_kegiatan
    }
    const schema = {
        id_mbkm : { type: "number", max: 3, optional: false },
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
            await belajar.create(data)
            .then ((result) => {
                res.status(200).json({
                    message: 'success insert data Belajar',
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
        id_mbkm : req.body.id_mbkm,
        id_user : req.body.id_user,
        id_role : req.body.id_role,
        periode_kegiatan : req.body.periode_kegiatan,
        rincian_kegiatan : req.body.rincian_kegiatan
    }
    const schema = {
        id_mbkm : { type: "string", max: 3, optional: false },
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
        await belajar.update(data, {where : {id : req.params.id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Update data Belajar',
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
        await belajar.destroy({where : {id : id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Delete data Belajar',
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
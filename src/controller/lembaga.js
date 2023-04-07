const { Lembaga } = require('../../models');
const controller = {};

const Validator = require("fastest-validator");
const v = new Validator();

controller.getAll = async function (req, res) {
    try {
        await Lembaga.findAll()
        .then ((result) => {
            if(result.length > 0) {
                res.status(200).json({
                    message: 'success show data Lembaga',
                    data: result
                })
            } else {
                res.status(200).json({
                    message: 'tidak ada data Lembaga',
                    data: []
                })
            }
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
        await Lembaga.findByPk(id)
        .then ((result) => {
            res.status(200).json({
                message: 'success view detail data Lembaga',
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
        nama : req.body.nama,
        alamat : req.body.alamat,
        telpon : req.body.telpon
    }
    const schema = {
        nama : { type: "string", min: 3, max: 30, optional: false },
        alamat : { type: "string", max: 50, optional: false },
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
            console.log(res)
            await Lembaga.create(data)
            .then ((result) => {
                res.status(200).json({
                    message: 'success insert data Lembaga',
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
        nama: req.body.nama,
        alamat : req.body.alamat,
        telpon : req.body.telpon
    }
    const schema = {
        nama : { type: "string", min: 6, max: 30, optional: false },
        alamat : { type: "string", max: 60, optional: false },
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
        await Lembaga.update(data, {where : {id : req.params.id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Update data Lembaga',
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
        await Lembaga.destroy({where : {id : id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Delete data Lembaga',
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
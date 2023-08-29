const { dokumen } = require('../../models');
const controller = {};

const Validator = require("fastest-validator");
const v = new Validator();
const upload = require('../middleware/multer');

controller.getAll = async function (req, res) {
    try {
        await dokumen.findAll()
        .then ((result) => {
            if(result.length > 0) {
                res.status(200).json({
                    message: 'success show data Dokumen',
                    data: result
                })
            } else {
                res.status(200).json({
                    message: 'tidak ada data Dokumen',
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
        await dokumen.findByPk(id)
        .then ((result) => {
            res.status(200).json({
                message: 'success detail Dokumen',
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
        file: req.file.originalname,
        lokasi_file : req.file.path,
        id_dosen : req.user.userid,
        id_mahasiswa : req.user.mahasiswa,
        program_studi : req.body.program_studi,
        fakultas : req.body.fakultas,
        semester : req.body.semester
    }
    try {
        await dokumen.create(data)
        .then ((result) => {
            res.status(200).json({
                message: 'success insert data Dokumen',
                data: result
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

controller.update = async function (req, res) {
    const data = {
        id_mbkm : req.body.id_mbkm,
        file: req.file.originalname,
        lokasi_file : req.file.path,
        id_dosen : req.user.userid,
        id_mahasiswa : req.user.mahasiswa,
        program_studi : req.body.program_studi,
        fakultas : req.body.fakultas,
        semester : req.body.semester
    }
    const schema = {
        id_mbkm : { type: "string", max: 3, optional: false }
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
        await dokumen.update(data, {where : {id : req.params.id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Update data Dokumen',
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
        await dokumen.destroy({where : {id : id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Delete data Dokumen',
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
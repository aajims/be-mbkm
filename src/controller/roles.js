const { Role } = require('../../models');
const controller = {};
const jwt = require('jsonwebtoken');

const Validator = require("fastest-validator");
const v = new Validator();

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

controller.getAll = async function (req, res) {
    try {
        await Role.findAll()
        .then ((result) => {
            if(result.length > 0) {
                res.status(200).json({
                    message: 'success show data Roles',
                    data: result
                })
            } else {
                res.status(200).json({
                    message: 'tidak ada data Roles',
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
        await Role.findByPk(id)
        .then ((result) => {
            res.status(200).json({
                message: 'success view detail data Roles',
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
        nama_role : req.body.nama_role,
        keterangan : req.body.keterangan
    }
    const schema = {
        nama_role : { type: "string", min: 4, max: 30, optional: false },
        keterangan : { type: "string", max: 30, optional: true },
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
            await Role.create(data)
            .then ((result) => {
                res.status(200).json({
                    message: 'success insert data Roles',
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
        nama_role : req.body.nama_role,
        keterangan : req.body.keterangan
    }
    const schema = {
        nama_role : { type: "string", min: 5, max: 30, optional: false },
        keterangan : { type: "string", max: 30 },
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
        await Role.update(data, {where : {id : req.params.id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Update data Roles',
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
        await Role.destroy({where : {id : id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Delete data Roles',
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
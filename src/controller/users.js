const { User, Role } = require('../../models');
const controller = {};

const jwt = require('jsonwebtoken');
const Validator = require("fastest-validator");
const v = new Validator();

const bcrypt = require('bcrypt');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const { Op } = require('sequelize');
const randtoken = require('rand-token');
var nodemailer = require('nodemailer');

controller.signup = async function (req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const data = {
                email : req.body.email,
                password : hash,
                id_role : req.body.id_role,
                status : 0,
                createdAt : new Date(),
                updatedAt : new Date(),
            }

            const schema = {
                email : { type: "email", optional: false },
                password : { type: "string", min: 5, max: 255, optional: false }
            }

            User.findOne({ where : {email : req.body.email} }).then(user => {
                if(user){
                    // -- Email sudah digunakan
                    res.status(400).json({
                        message : 'Email already exist'
                    });
                } else {
                    const validationResult = v.validate(data, schema);
        
                    if (validationResult !== true) {
                        // -- Data tidak valid
                        res.status(400).json({
                            message : 'Validation Failed',
                            data: validationResult
                        });
                } else {
                    User.create(data).then(result => {
                        res.status(200).json({
                            message : 'Success Register Data',
                            data: result
                        });
                    }).catch(err => {
                        res.status(500).json({
                            message : 'Register Failed',
                            data: err
                        });
                    });                
                }   
            }
        })
    })
  })
}

controller.signin = async function (req, res) {
    User.findOne({ where : {email : req.body.email} }).then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {                    
                    if (result)    {
                    const token = jwt.sign({
                        email : user.email,
                        userid : user.id,
                        userRole : user.id_role
                    }, JWT_SECRET, function (err, token){
                        if (user.status == 0) {
                            res.status(405).json({
                                status: "Login Failed",
                                message: "Akun Anda belum Aktif, silahkan nunggu di Approve oleh Admin",
                                data: result
                            })
                        }
                        res.status(200).json({
                            status : "SUCCESS",
                            message : 'Success login',
                            token : token,
                            data: result
                        });      
                        console.log(user.status)
                    });
                        
                    } else {
                        res.status(401).json({
                            status : "FAILED",
                            message : "Worng Password",
                            data : err
                        })
                    }
            })
        } else {
            res.status(401).json({
                message : 'Email not found',
                data: user
            });
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message : 'Login Failed',
            data: err
        });
    });
}

controller.getAllUsers = async function (req, res) {
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
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    User.belongsTo(Role, {foreignKey: 'id_role'})
    try {
        await User.findAll({ where: condition, limit, offset, include: [
            {
                model: Role,
                attributes: ['nama_role'],
                required: false
            }
        ] })
        .then ((result) => {
            const data = { totalItems: result.length, rows: result }
            const response = getPagingData(data, page, limit);
            res.status(200).json({
                message: 'success show data Users',
                data: response
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
    User.belongsTo(Role, {foreignKey: 'id_role'})
    try {
        await User.findByPk((id),{include: [
            {
                model: Role,
                attributes: ['nama_role'],
                required: false
            }
        ]})
        .then ((result) => {
            res.status(200).json({
                message : 'success show detail data user',
                data : result
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

controller.updateUsers = async function (req, res) {
    const id = req.params.id
    const data = {
        email : req.body.email,
        name : req.body.name,
        no_induk : req.body.no_induk,
        jenis_kelamin : req.body.jenis_kelamin,
        alamat : req.body.alamat,
        no_hp : req.body.no_hp,
        status : req.body.status,
        id_role : req.body.id_role,
        jabatan : req.body.jabatan,
        mulai_mengajar : req.body.mulai_mengajar,
        status_mengajar : req.body.status_mengajar,
        mengajar_jenjang : req.body.mengajar_jenjang,
        perguruan_tinggi : req.body.perguruan_tinggi
    }
    const schema = {
        email : { type: "email", optional: false },
        name : { type: "string", optional: false },
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
            await User.update(data, {where : {id : id}})
            .then ((result) => {
                res.status(200).json({
                    message: 'success Update data User',
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


controller.approveUser = async function (req, res) {
    const id = req.params.id
    const data = {
        status : req.body.status
    }
    try {
        await User.update(data, {where : {id : id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Approve data User',
                data: data
            })
        })
        } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

controller.deleteUsers = async function (req, res) {
    const id = req.params.id
    try {
        await User.destroy({where : {id : id}})
        .then ((result) => {
            res.status(200).json({
                message: 'success Delete data User',
                data: result
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

controller.profile = async function(req, res) {
    try {
        await User.findByPk(req.user.userid)
        .then ((result) => {
            const user = result
            delete user.password;
            res.status(200).json({
                message : 'success show detail data user',
                data : user
            })
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}

controller.updateProfile = async function (req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
            const data = {
                email : req.body.email,
                password : hash,
                name : req.body.name,
                no_induk : req.body.no_induk,
                jenis_kelamin : req.body.jenis_kelamin,
                alamat : req.body.alamat,
                no_hp : req.body.no_hp,
            }
            const schema = {
                email : { type: "email", optional: false },
                name : { type: "string", optional: false },
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
                    await User.update(data, {where : {id : req.user.userid}})
                    .then ((result) => {
                        res.status(200).json({
                            message: 'success Update data User',
                            data: data
                        })
                    })
                } catch (error) {
                    res.status(401).json({
                        message: error
                    })
                }
            }
        })
    })
}

const sendEmail = (email, token) => {
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nbhnazfar@gmail.com', // Your email id
            pass: 'sharifa07' // Your password
        }
    });
    var mailOptions = {
        from: 'nbhnazfar@gmail.com',
        to: email,
        subject: 'Reset Password Link - Nicesnippets.com',
        html: 'You requested for reset password, kindly use this localhost:4000/api/user/reset-password?token='+token+' to reset your password'
    };
   result  = mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
            return false
        } else {
            return true
        }
    });
    return result
}

controller.requestResetPassword = async function (req, res) {
    try {
        await User.findOne({ where : {email : req.body.email} })
        .then (async (result) => {
            if(result.dataValues){
                var token = await randtoken.generate(20);
                var sent = sendEmail(req.body.email, token);
                
                if(sent){
                    var data = {
                        token: token
                    }
                    await User.update(data, {where : {email : req.body.email}}).then(result => {
                        if(result){
                            res.status(200).json({
                                message: 'success Update data User',
                                url: 'localhost:4000/api/user/reset-password?hash='+token,
                                data: data
                            })
                        }else{
                            res.status(401).json({
                                message: error
                            })
                        }
                    })
                }
           }
        })
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: error
        })
    }
}

controller.resetPassword = async function (req, res) {
    try {
        var token = req.params.hash;
        console.log(token)
        await User.findOne({ where : {token : token} })
        .then (async (result) => {
            if(result.dataValues){
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        var data = {
                            password: hash
                        }
                         User.update(data, {where : {token : token}}).then(result => {
                            if(result){
                                res.status(200).json({
                                    message: 'Password berhasil diupdate',
                                })
                            }else{
                                res.status(401).json({
                                    message: error
                                })
                            }
                        })
            
                        
                })
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
module.exports = controller;
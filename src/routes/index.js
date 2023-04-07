var express = require('express');
var router = express.Router();
const userRoute = require('./users')
const mbkmRoute = require('./mbkm')
const roleRoute = require('./roles')
const authRoute = require('./auth')
const lembagaRoute = require('./lembaga')
const belajarRoute = require('./belajar')
const dokumenRoute = require('./dokumen')


router.use('/auth', authRoute)
router.use('/api/user', userRoute)
router.use('/api/mbkm', mbkmRoute)
router.use('/api/role', roleRoute)
router.use('/api/lembaga', lembagaRoute)
router.use('/api/belajar', belajarRoute)
router.use('/api/dokumen', dokumenRoute)

module.exports = router;
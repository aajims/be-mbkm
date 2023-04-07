const express = require('express');

const controller = require('../controller/index');

const router = express.Router();

router.post('/signup', controller.users.signup);
router.post('/signin', controller.users.signin);

module.exports = router;
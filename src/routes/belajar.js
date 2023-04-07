const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.auth, controller.belajar.getAll);
router.post('/', authMiddleware.auth, controller.belajar.insert);
router.get('/:id', authMiddleware.auth, controller.belajar.getById);
router.patch('/:id', authMiddleware.auth, controller.belajar.update);
router.delete('/:id', authMiddleware.auth, controller.belajar.delete);


module.exports = router;
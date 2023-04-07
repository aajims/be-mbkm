const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', [ authMiddleware.auth, adminMiddleware ], controller.lembaga.getAll);
router.post('/', [ authMiddleware.auth, adminMiddleware ], controller.lembaga.insert);
router.get('/:id', [ authMiddleware.auth, adminMiddleware ], controller.lembaga.getById);
router.patch('/:id', [ authMiddleware.auth, adminMiddleware ], controller.lembaga.update);
router.delete('/:id', [ authMiddleware.auth, adminMiddleware ], controller.lembaga.delete);


module.exports = router;
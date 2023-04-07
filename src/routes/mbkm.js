const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', [ authMiddleware.auth ], controller.mbkm.getAll);
router.post('/', [ authMiddleware.auth, adminMiddleware ], controller.mbkm.createNewMbkm);
router.get('/:id', [ authMiddleware.auth ], controller.mbkm.getById);
router.patch('/:id', [ authMiddleware.auth, adminMiddleware ], controller.mbkm.update);
router.delete('/:id', [ authMiddleware.auth, adminMiddleware ], controller.mbkm.delete);


module.exports = router;
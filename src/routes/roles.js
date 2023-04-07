const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', [ authMiddleware.auth, adminMiddleware ], controller.roles.getAll);
router.post('/', [ authMiddleware.auth, adminMiddleware ], controller.roles.insert);
router.get('/:id', [ authMiddleware.auth, adminMiddleware ], controller.roles.getById);
router.patch('/:id', [ authMiddleware.auth, adminMiddleware ], controller.roles.update);
router.delete('/:id', [ authMiddleware.auth, adminMiddleware ], controller.roles.delete);


module.exports = router;
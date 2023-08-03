const express = require('express');

const controller = require('../controller/index');

const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', [ authMiddleware.auth, adminMiddleware ], controller.users.getAllUsers);
router.get('/profile', authMiddleware.auth, controller.users.profile);
router.patch('/profile', authMiddleware.auth, controller.users.updateProfile);
router.put('/approve/:id', [ authMiddleware.auth, adminMiddleware ], controller.users.approveUser);
router.get('/:id', [ authMiddleware.auth, adminMiddleware ], controller.users.getById);
router.patch('/:id', [ authMiddleware.auth, adminMiddleware ], controller.users.updateUsers);
router.delete('/:id', [ authMiddleware.auth, adminMiddleware ], controller.users.deleteUsers);
router.post('/request-password-email', controller.users.requestResetPassword);
router.post('/reset-password', controller.users.resetPassword);

module.exports = router;
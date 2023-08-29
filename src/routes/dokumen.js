const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/multer');
const dosenMiddleware = require('../middleware/dosen');
const adminMiddleware = require('../middleware/admin');

router.get('/', authMiddleware.auth, controller.dokumen.getAll);
router.post('/upload', authMiddleware.auth, upload.single("file"), dosenMiddleware, controller.dokumen.insert);
router.get('/:id', authMiddleware.auth, controller.dokumen.getById);
router.delete('/:id', authMiddleware.auth, dosenMiddleware, adminMiddleware, controller.dokumen.delete);


module.exports = router;
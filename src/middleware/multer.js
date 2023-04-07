const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/document')
    },
    filename: (req, file, cb) => {
        const originalname = file.originalname;

        cb(null, `${originalname}`);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024 //3MB
    }
});

module.exports = upload;

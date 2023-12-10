const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/jpg'
        || file.imetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter
});

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.post('/fileupload', upload.single('image'),
    (req, res, next) => {
        const filename = req.file.filename;
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
        res.json({
            message: 'Image Uploaded Successfully',
            filename: filename,
            fileUrl : fileUrl
        })
    });

module.exports = router;
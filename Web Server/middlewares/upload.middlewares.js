// Bhumitra\Web Server\middleware\upload.js

const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

// Set up file filter for image uploads
const file_filter = (req, file, cb) => {
    const allowed_types = /jpeg|jpg|png|gif/;
    const mime_type = allowed_types.test(file.mimetype);
    const extname = allowed_types.test(path.extname(file.originalname).toLowerCase());

    if (mime_type && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'));
    }
};

// Set up upload middleware
const upload = multer({
    storage: storage,
    fileFilter: file_filter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

module.exports = upload;

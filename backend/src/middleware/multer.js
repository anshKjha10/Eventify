const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        if (file.mimetype && file.mimetype.startsWith("image/")) {
            return cb(null, true);
        }

        return cb(new Error("Only image files are allowed."));
    }
});

module.exports = upload;
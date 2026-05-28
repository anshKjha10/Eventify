const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const uploadDir = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        const uniqueFilename = `${uuidv4()}${path.extname(file.originalname).toLowerCase()}`;
        cb(null, uniqueFilename);
    }
});

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
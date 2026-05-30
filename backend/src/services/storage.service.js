const fs = require("fs/promises");
const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName, options = {}) {
    const result = await imagekit.upload({
        file,
        fileName,
        ...options
    });

    return result;
}

async function uploadMulterFile(file, options = {}) {
    if (!file) {
        return null;
    }

    const fileBuffer = file.buffer
        ? file.buffer
        : await fs.readFile(file.path);
    const fileName = file.filename || file.originalname || `upload-${Date.now()}`;
    const result = await uploadFile(fileBuffer, fileName, options);

    if (file.path) {
        await fs.unlink(file.path).catch(() => {
            // Best-effort cleanup if the temp file was already removed.
        });
    }

    return result;
}

module.exports = {
    uploadFile,
    uploadMulterFile
};
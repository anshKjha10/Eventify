const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/multer');

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.patch("/profile-photo", authMiddleware, upload.single("avatar"), authController.updateProfilePhoto);

module.exports = router;
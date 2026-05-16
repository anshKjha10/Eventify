const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizer.controller');

router.post('/register', organizerController.registerOrganizer);
router.post('/login', organizerController.loginOrganizer);

module.exports = router;

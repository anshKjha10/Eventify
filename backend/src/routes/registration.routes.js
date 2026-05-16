const express = require('express');
const router = express.Router();
const regController = require('../controllers/registration.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// user routes
router.get('/my-registrations', authMiddleware, regController.getMyRegistrations);

router.post('/:eventId', authMiddleware, regController.registerForEvent);

router.delete('/:eventId', authMiddleware, regController.cancelRegistration);

// admin routes
router.get('/:eventId/participants', authMiddleware, adminMiddleware, regController.getEventParticipants);

module.exports = router;
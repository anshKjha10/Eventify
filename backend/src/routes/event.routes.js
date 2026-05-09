const express = require("express");
const router = express.Router();
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// public routes
router.get("/", eventController.getAllEvents);

router.get("/my-events", authMiddleware, adminMiddleware, eventController.getMyEvents); // this needs to be above ById otherwise /my-events is treated as /:eventId, it is admin only too

router.get("/:eventId", eventController.getEventById);

// admin routes
router.post("/", authMiddleware, adminMiddleware, eventController.createEvent);

router.put("/:eventId", authMiddleware, adminMiddleware, eventController.updateEvent);

router.delete("/:eventId", authMiddleware, adminMiddleware, eventController.deleteEvent);

module.exports = router;
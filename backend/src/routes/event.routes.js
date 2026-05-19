const express = require("express");
const router = express.Router();
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const upload = require('../middleware/multer');

// public routes
router.get("/", eventController.getAllEvents);

router.get("/my-events", authMiddleware, adminMiddleware, eventController.getMyEvents); // this needs to be above ById otherwise /my-events is treated as /:eventId, it is admin only too

router.get("/:id", eventController.getEventById);

// admin routes
router.post("/create-event", authMiddleware, adminMiddleware, upload.single("image"), eventController.createEvent);

router.put("/update-event/:id", authMiddleware, adminMiddleware, upload.single("image"), eventController.updateEvent);

router.delete("/delete-event/:id", authMiddleware, adminMiddleware, eventController.deleteEvent);

module.exports = router;
const express = require("express");
const validateRequest = require("../../middlewares/validate-request");
const eventController = require("../../controllers/event.controller");
const { checkAuth } = require("../../middlewares/authMiddleware");
const { isAdminOrVendor } = require("../../middlewares/authorization");
const { 
   updateEventSchema, 
   getEventSchema, 
   queryEventsSchema 
} = require("../../utils/validations/event.validation");

const router = express.Router();

router
   .route("/")
   .get(checkAuth, eventController.getEvents)
   .post(checkAuth, isAdminOrVendor, eventController.createEvent);

router
   .route("/:id")
   .get(checkAuth, eventController.getEvent)
   .put(checkAuth, isAdminOrVendor, eventController.updateEvent)
   .delete(checkAuth, isAdminOrVendor, eventController.deleteEvent);

router.patch(
   "/:id/status",
   checkAuth,
   isAdminOrVendor,
   eventController.updateEventStatus
);

module.exports = router;

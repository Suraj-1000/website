const express = require("express");
const validateRequest = require("../../middlewares/validate-request");
const bookingController = require("../../controllers/booking.controller");
const { 
   createBookingSchema, 
   updateBookingSchema, 
   getBookingSchema, 
   queryBookingsSchema 
} = require("../../utils/validations/booking.validation");

const { checkAuth } = require("../../middlewares/authMiddleware");
const { isAdminOrVendor } = require("../../middlewares/authorization");

const router = express.Router();

router
   .route("/")
   .post(checkAuth, isAdminOrVendor, validateRequest(createBookingSchema), bookingController.createBooking)
   .get(checkAuth, bookingController.getBookings);

router
   .route("/:id")
   .get(checkAuth, bookingController.getBooking)
   .patch(checkAuth, isAdminOrVendor, validateRequest(updateBookingSchema), bookingController.updateBooking)
   .delete(checkAuth, isAdminOrVendor, bookingController.deleteBooking);

router.patch(
   "/:id/status",
   checkAuth,
   isAdminOrVendor,
   bookingController.updateBookingStatus
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/booking.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

// Student
router.post("/bookings", isLoggedIn, controller.createBooking);
router.get("/bookings/me", isLoggedIn, controller.getMyBookings);

// Tutor
router.get("/tutor/bookings", isLoggedIn, controller.getTutorBookings);
router.patch("/bookings/:id/accept", isLoggedIn, controller.acceptBooking);

module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/booking.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

router.post("/bookings", isLoggedIn, controller.createBooking);
router.get("/bookings/me", isLoggedIn, controller.getMyBookings);

module.exports = router;
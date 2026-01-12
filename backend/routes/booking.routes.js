const express = require("express");
const router = express.Router();
const controller = require("../controllers/booking.controller");
const { isStudent } = require("../middleware/auth.middleware");

router.post("/bookings", isStudent, controller.createBooking);

module.exports = router;
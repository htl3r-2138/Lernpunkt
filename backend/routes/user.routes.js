const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { isLoggedIn, isTutor } = require("../middleware/auth.middleware");

router.put("/user/hourly-rate", isTutor, controller.updateHourlyRate);
router.put("/user/email", isLoggedIn, controller.updateEmail);
router.put("/user/password", isLoggedIn, controller.updatePassword);
router.delete("/user", isLoggedIn, controller.deleteAccount);

module.exports = router;

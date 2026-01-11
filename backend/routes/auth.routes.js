const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register/student", authController.registerStudent);
router.post("/register/tutor", authController.registerTutor);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.me);

module.exports = router;
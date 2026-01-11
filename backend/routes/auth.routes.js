const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/register/student", authController.registerStudent);
router.post("/register/tutor", authController.registerTutor);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authController.me);

const { isLoggedIn, isStudent, isTutor } = require("../middleware/auth.middleware");

router.get("/protected", isLoggedIn, (req, res) => {
  res.json({ message: "Du bist eingeloggt", user: req.session.user });
});

router.get("/student-only", isStudent, (req, res) => {
  res.json({ message: "Willkommen Student", user: req.session.user });
});

router.get("/tutor-only", isTutor, (req, res) => {
  res.json({ message: "Willkommen Tutor", user: req.session.user });
});

module.exports = router;
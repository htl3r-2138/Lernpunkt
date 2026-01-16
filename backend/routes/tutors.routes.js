const express = require("express");
const router = express.Router();
const controller = require("../controllers/tutors.controller");

router.get("/tutors", controller.getAllTutors);

router.get(
  "/students/:studentId/recommended-tutors",
  controller.getRecommendedTutors
);

module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/subjects.controller");

router.get("/subjects", controller.getAllSubjects);
router.get("/user/subjects", controller.getMySubjects);
router.put("/user/subjects", controller.saveMySubjects);

module.exports = router;
const express = require("express");
const router = express.Router();
const academicController = require("../controllers/academic.controller");

router.get("/colleges", academicController.getColleges);
router.get("/courses", academicController.getCourses);
router.get("/semesters", academicController.getSemesters);
router.get("/subjects", academicController.getSubjects);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getColleges,
  getCollegeById,
  getCourses,
  getYears,
  getSemesters,
  getSubjects,
  getSubjectById
} = require("../controllers/academic.controller");

router.get("/colleges", getColleges);
router.get("/colleges/:collegeId", getCollegeById);
router.get("/colleges/:id", getCollegeById);

router.get("/courses", getCourses);
router.get("/courses/:courseId/years", getYears);
router.get("/courses/:id/years", getYears);
router.get("/courses/:courseId/semesters", getSemesters);
router.get("/courses/:id/semesters", getSemesters);

router.get("/subjects", getSubjects);
router.get("/subjects/:subjectId", getSubjectById);
router.get("/subjects/:id", getSubjectById);

module.exports = router;

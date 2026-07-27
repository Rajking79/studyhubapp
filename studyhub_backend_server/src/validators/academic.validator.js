const { body, param, query } = require("express-validator");
const validate = require("../middlewares/validate.middleware");

const validateCollege = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("College name is required"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),
  body("category")
    .optional()
    .isIn(["State Univ", "Central University", "Private", "Govt."])
    .withMessage("Invalid college category"),
  validate
];

const validateCourse = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Course name is required"),
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Course code is required"),
  body("collegeId")
    .notEmpty()
    .withMessage("College ID is required"),
  validate
];

const validateSubject = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Subject title is required"),
  body("courseId")
    .notEmpty()
    .withMessage("Course ID is required"),
  validate
];

module.exports = {
  validateCollege,
  validateCourse,
  validateSubject
};

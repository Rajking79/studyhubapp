const { body } = require("express-validator");
const validate = require("../middlewares/validate.middleware");

const validateProfileUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("phone")
    .optional()
    .trim(),
  validate
];

const validateCgpaCalculate = [
  body("semester")
    .notEmpty()
    .withMessage("Semester is required"),
  body("subjects")
    .isArray({ min: 1 })
    .withMessage("Subjects array with at least 1 subject is required"),
  validate
];

const validateAttendanceSubject = [
  body("subjectName")
    .trim()
    .notEmpty()
    .withMessage("Subject name is required"),
  validate
];

module.exports = {
  validateProfileUpdate,
  validateCgpaCalculate,
  validateAttendanceSubject
};

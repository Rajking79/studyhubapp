const { body, param, query } = require("express-validator");
const validate = require("../middlewares/validate.middleware");

const validateUploadMaterial = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),
  body("subjectId")
    .notEmpty()
    .withMessage("Subject ID is required"),
  body("category")
    .isIn(["pyq", "notes", "book", "guide", "syllabus", "question_bank", "video"])
    .withMessage("Invalid category type"),
  validate
];

module.exports = {
  validateUploadMaterial
};

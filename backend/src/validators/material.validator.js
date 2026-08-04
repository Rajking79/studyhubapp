const { body } = require("express-validator");

const uploadMaterialValidator = [
  body("title").trim().notEmpty().withMessage("Material title is required"),
  body("category").trim().notEmpty().withMessage("Category is required").isIn(["Notes", "PYQ", "Book", "Video", "Question Bank"]).withMessage("Invalid category")
];

module.exports = {
  uploadMaterialValidator
};

const { body } = require("express-validator");

const collegeValidator = [
  body("name").trim().notEmpty().withMessage("College name is required"),
  body("shortCode").trim().notEmpty().withMessage("Short code is required").toUpperCase()
];

module.exports = {
  collegeValidator
};

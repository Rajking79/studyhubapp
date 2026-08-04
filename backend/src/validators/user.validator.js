const { body } = require("express-validator");

const updateProfileValidator = [
  body("name").optional().trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
  body("phone").optional().trim()
];

module.exports = {
  updateProfileValidator
};

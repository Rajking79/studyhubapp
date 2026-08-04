const { body } = require("express-validator");

const adminRegisterValidator = [
  body("email").trim().notEmpty().isEmail().withMessage("Valid admin email required"),
  body("password").notEmpty().isLength({ min: 8 }).withMessage("Admin password must be at least 8 characters long")
];

module.exports = {
  adminRegisterValidator
};

const { body, param } = require("express-validator");
const validate = require("../middlewares/validate.middleware");

const validateBanner = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Banner title is required"),
  body("imageUrl")
    .trim()
    .notEmpty()
    .withMessage("Banner image URL is required"),
  validate
];

const validateBroadcastNotice = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Notification title is required"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Notification description is required"),
  validate
];

module.exports = {
  validateBanner,
  validateBroadcastNotice
};

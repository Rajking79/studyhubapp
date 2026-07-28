const { param, query } = require("express-validator");
const mongoose = require("mongoose");
const validate = require("../middlewares/validate.middleware");

// Validate Mongo ObjectId in URL params (if param is present and 24 hex char format)
const validateMongoId = (paramName = "id") => [
  param(paramName)
    .optional()
    .custom((value) => {
      if (value && !mongoose.Types.ObjectId.isValid(value) && !value.startsWith("col-") && !value.startsWith("crs-") && !value.startsWith("sbj-") && !value.startsWith("mat-") && !value.startsWith("bnr-") && !value.startsWith("std-") && !value.startsWith("du_") && !value.startsWith("btech_") && !value.startsWith("subj_")) {
        throw new Error(`Invalid ${paramName} format`);
      }
      return true;
    }),
  validate
];

module.exports = {
  validateMongoId
};

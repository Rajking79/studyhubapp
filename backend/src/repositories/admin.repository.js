const mongoose = require("mongoose");
const Admin = require("../models/Admin.model");

class AdminRepository {
  async findByEmail(email) {
    if (mongoose.connection.readyState === 1) return await Admin.findOne({ email });
    return null;
  }
}

module.exports = new AdminRepository();

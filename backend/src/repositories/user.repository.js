const mongoose = require("mongoose");
const User = require("../models/User.model");
const mockData = require("../services/dataStore");

class UserRepository {
  async findByEmail(email) {
    if (mongoose.connection.readyState === 1) {
      return await User.findOne({ email: email.toLowerCase() });
    }
    return mockData.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findById(id) {
    if (mongoose.connection.readyState === 1) {
      return await User.findById(id);
    }
    return mockData.users.find((u) => u._id === id) || mockData.users[0];
  }

  async create(userData) {
    if (mongoose.connection.readyState === 1) {
      return await User.create(userData);
    }
    const newUser = { _id: "usr_" + Date.now(), ...userData };
    mockData.users.push(newUser);
    return newUser;
  }

  async updateById(id, updateData) {
    if (mongoose.connection.readyState === 1) {
      return await User.findByIdAndUpdate(id, updateData, { new: true });
    }
    const user = mockData.users.find((u) => u._id === id);
    if (user) Object.assign(user, updateData);
    return user;
  }
}

module.exports = new UserRepository();

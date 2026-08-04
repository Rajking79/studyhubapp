const mongoose = require("mongoose");
const User = require("../models/User.model");
const { mockUsers } = require("../services/dataStore");

const isDbConnected = () => mongoose.connection.readyState === 1;

const findUserById = async (userId) => {
  if (isDbConnected()) {
    return await User.findById(userId);
  }
  return mockUsers.find((u) => u._id === userId) || mockUsers[0];
};

const findUserByEmail = async (email) => {
  if (isDbConnected()) {
    return await User.findOne({ email: email.toLowerCase() }).select("+password");
  }
  return mockUsers.find((u) => u.email === email.toLowerCase()) || null;
};

const createUser = async (userData) => {
  if (isDbConnected()) {
    const user = new User(userData);
    return await user.save();
  }
  const newUser = { _id: "usr_" + Date.now(), ...userData, isDeleted: false, isBlocked: false };
  mockUsers.push(newUser);
  return newUser;
};

const updateUserProfile = async (userId, updateData) => {
  if (isDbConnected()) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }
  const user = mockUsers.find((u) => u._id === userId) || mockUsers[0];
  Object.assign(user, updateData);
  return user;
};

const softDeleteUser = async (userId) => {
  if (isDbConnected()) {
    return await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
  }
  const user = mockUsers.find((u) => u._id === userId) || mockUsers[0];
  user.isDeleted = true;
  return user;
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateUserProfile,
  softDeleteUser
};

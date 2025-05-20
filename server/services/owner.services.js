// services/owner.services.js
const Owner = require('../models/owner.model');

const registerOwner = async (data) => {
  const owner = new Owner(data);
  return await owner.save();
};

const findOwnerByEmail = async (email) => {
  return await Owner.findOne({ email });
};

module.exports = { registerOwner, findOwnerByEmail };

const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others']
  },
  password: {
    type: String,
    required: true,
  },
  occupancyType: {
    type: String,
    enum: ['Student', 'Family', 'Job Holder', 'Single', 'PG'],
    // required: true
  },
  address: {
    state: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    pincode: {
      type: Number,
      // required: true,  
    }
  },
  roomsRented: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }],
});

const tenantModel = mongoose.model('Tenant', tenantSchema);

module.exports = tenantModel;

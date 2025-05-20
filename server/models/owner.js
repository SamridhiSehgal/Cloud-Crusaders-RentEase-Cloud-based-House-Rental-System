const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ownerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
  },
   role: {
      type: String,
      default: 'owner',
    },    rooms: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room' 
        }],
        tenants:[{ //each owner having tenant list
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tenant'
        }],
        rentalRequests: [{
            tenant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tenant',
                required: true
            },
            room: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room',
                required: true
            },
            status: {
                type: String,
                enum: ['pending', 'approved', 'rejected'],
                default: 'pending'
            },
            requestedAt: {
                type: Date,
                default: Date.now
            }
        }],
});

module.exports = mongoose.model('Owner', ownerSchema);

const mongoose=require('mongoose');
const ownerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        default: 'owner', //other one be agent...
    },
    rooms: [{ 
        type: String,
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
    // notifications: [{
    //     message: String,
    //     date: {
    //         type: Date,
    //         default: Date.now,
    //     },
    // }],
});

const ownerModel=mongoose.model('Owner', ownerSchema);
module.exports = ownerModel;
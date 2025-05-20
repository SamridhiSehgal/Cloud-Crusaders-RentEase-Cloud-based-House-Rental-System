const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    location: {
        type: String,
        // required: true,
    },
    rentPrice: {
        type: Number,
        required: true,
    },
    parking: {
        type: Boolean,
        default: false,
    },
    wifi: {
        type: Boolean,
        default: false,
    },
    purifier: {
        type: Boolean,
        default: false,
    },
    airConditioner: {
        type: Boolean,
        default: false,
    },
    images: [{
        type: String, // URL of uploaded images
        required: true,
    }],
    availability: {
        type: Boolean,
        default: true,
    },
    bhk: {
        type: Number, // Number of Bedrooms, Hall, Kitchen
        required: true,
    },
    size: {
        length: {
            type: Number, // Size in square feet
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
    },
    floor: {
        type: String, // Example: "Ground out of 2", "3 out of 5"
        required: true,
    },
    areaType: {
        type: String,
        enum: ['Super Area', 'Carpet Area', 'Build Area'],
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String, // City where the property is located
        required: true,
    },
    areaLocality: {
        type: String, // Locality of the property
        required: true,
    },
    furnishingStatus: {
        type: String,
        enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
        required: true,
    },
    tenantPreferred: {
        type: String, // Type of tenant preferred by owner or agent
        required: true,
    },
    bathroom: {
        type: Number, // Number of bathrooms
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
    },
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

module.exports = Room;

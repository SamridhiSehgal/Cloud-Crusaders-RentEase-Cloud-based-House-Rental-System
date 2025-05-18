const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Correct import for v9.7.0
const roomModel = require('../models/room.model');
const { client, connectToDatabase } = require('../db/db.config');
const { response } = require('express');

connectToDatabase();

// Generate fake room data
const generateFakeRoom = () => {
    return {
        location: faker.location.streetAddress(), // Recommended method
        rentPrice: faker.number.int({ min: 5000, max: 50000 }),
        parking: faker.datatype.boolean(),
        wifi: faker.datatype.boolean(),
        purifier: faker.datatype.boolean(),
        airConditoner: faker.datatype.boolean(),
        images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.url()), // Recommended method
        availability: faker.datatype.boolean(),
        bhk: faker.number.int({ min: 1, max: 5 }),
        size: faker.number.int({ min: 300, max: 3000 }),
        floor: `${faker.number.int({ min: 1, max: 10 })} out of ${faker.number.int({ min: 1, max: 15 })}`,
        areaType: faker.helpers.arrayElement(['Super Area', 'Carpet Area', 'Build Area']),
        state: faker.location.state(), // Recommended method
        district: faker.location.state(), // Using state as district as a placeholder
        city: faker.location.city(), // Recommended method
        areaLocality: faker.location.secondaryAddress(), // Recommended method
        furnishingStatus: faker.helpers.arrayElement(['Furnished', 'Semi-Furnished', 'Unfurnished']),
        tenantPreferred: faker.helpers.arrayElement(['Family', 'Bachelor', 'Working Professional']),
        bathroom: faker.number.int({ min: 1, max: 4 }),
        owner: new mongoose.Types.ObjectId(), // Random owner ID for testing
    };
};

// Seed fake data into MongoDB
const seedRooms = async (count = 10) => {
    try {
        const rooms = Array.from({ length: count }, generateFakeRoom);
        //await roomModel.insertOne(rooms);
        console.log(rooms);
        console.log(`${count} fake rooms added to the database.`);
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting fake data:', error);
        mongoose.connection.close();
    }
};

// Generate 20 fake rooms
seedRooms(1);

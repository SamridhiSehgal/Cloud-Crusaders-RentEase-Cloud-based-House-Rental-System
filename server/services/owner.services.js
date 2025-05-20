const Owner = require('../models/owner.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'yourVeryStrongSecretKey123!';

// Register new owner
async function createOwner(data) {
    const existingOwner = await Owner.findOne({ email: data.email });
    if (existingOwner) throw new Error('Email already registered');

    const owner = new Owner(data);
    await owner.save();
    return owner;
}

// Owner login
async function loginOwner(email, password) {
    const owner = await Owner.findOne({ email });
    if (!owner) throw new Error('Invalid email or password');

    const isMatch = await owner.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = jwt.sign({ id: owner._id, role: owner.role }, JWT_SECRET, { expiresIn: '1d' });

    return { owner, token };
}

module.exports = {
    createOwner,
    loginOwner,
};

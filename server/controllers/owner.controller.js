const { validationResult } = require('express-validator');
const ownerServices=require('../services/owner.services');

module.exports.registerOwner = async (req, res) => {
    console.log("i am here");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({message: "Invalid signup details",errors: errors.array()});
    }

    try {
        // console.log(req.body);
        // Add logic to handle owner registration (e.g., saving to the database)  owner service call...
        const owner= ownerServices.createUser(req.body);
        res.status(201).json({ message: "Owner registered successfully" ,owner});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
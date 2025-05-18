const express = require('express');
const { body } = require('express-validator');

const route = express.Router();
const ownerControllers=require('../controllers/owner.controller')
const validateOwnerData = [
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long'),
    body('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone()
        .withMessage('Invalid phone number'),
];

route.post('/signup', validateOwnerData, ownerControllers.registerOwner);

module.exports = route;
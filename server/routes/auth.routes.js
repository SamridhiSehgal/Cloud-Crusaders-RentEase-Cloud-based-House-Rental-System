// routes/auth.routes.js

const express = require('express');
const { body } = require('express-validator');
const { ownerSignup, ownerLogin } = require('../controllers/auth.controller');

const router = express.Router(); // CORRECT

router.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  ],
  ownerSignup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  ownerLogin
);

module.exports = router;






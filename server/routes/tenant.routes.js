const express = require('express');
const { body, validationResult } = require('express-validator');
const { registerTenant, loginTenant } = require('../controllers/tenant.controller');

const router = express.Router();

// ✅ Validation rules for tenant signup
const validateTenantSignup = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number'),
];

// ✅ Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// ✅ Routes
router.post('/signup', validateTenantSignup, handleValidationErrors, registerTenant);
router.post('/login', loginTenant); // Optional: Add login route

module.exports = router;

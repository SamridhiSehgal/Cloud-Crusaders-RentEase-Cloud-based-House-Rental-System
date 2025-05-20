const express = require('express');
const { body } = require('express-validator');
const { registerOwner, loginOwner } = require('../controllers/owner.controller');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Validation rules for signup
const validateSignup = [
  body('username').notEmpty().withMessage('Username is required').isLength({ min: 3 }),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Min 6 chars password'),
  body('phone').notEmpty().isMobilePhone().withMessage('Valid phone number required'),
];

// Validation rules for login
const validateLogin = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];

// Signup route
router.post('/signup', validateSignup, registerOwner);

// Login route
router.post('/login', validateLogin, loginOwner);

// Example protected route to test JWT authentication
router.get('/profile', authenticateToken, (req, res) => {
  // req.owner contains decoded JWT payload
  res.json({ message: 'This is a protected route', owner: req.owner });
});
router.get('/all', getAllOwners);
module.exports = router;

/*const express = require('express');
const { body } = require('express-validator');
const ownerControllers = require('../controllers/owner.controller');

const route = express.Router();

const validateOwnerSignup = [
    body('username').notEmpty().isLength({ min: 3 }),
    body('email').trim().isEmail(),
    body('password').notEmpty().isLength({ min: 6 }),
    body('phone').notEmpty().isMobilePhone()
];

const validateOwnerLogin = [
    body('email').trim().isEmail(),
    body('password').notEmpty()
];

route.post('/signup', validateOwnerSignup, ownerControllers.registerOwner);
route.post('/login', validateOwnerLogin, ownerControllers.loginOwner);

module.exports = route;
*/
/*const express = require('express');
const { body } = require('express-validator');
const ownerControllers = require('../controllers/owner.controller');

const route = express.Router();

const validateOwnerSignup = [
    body('username').notEmpty().withMessage('Username is required').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number'),
];

const validateOwnerLogin = [
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Signup route
route.post('/signup', validateOwnerSignup, ownerControllers.registerOwner);

// Login route
route.post('/login', validateOwnerLogin, ownerControllers.loginOwner);

module.exports = route;
*/
/*const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Owner = require('../models/owner');

// Register new owner
const registerOwner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, phone } = req.body;

    try {
        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newOwner = new Owner({
            username,
            email,
            password: hashedPassword,
            phone
        });

        await newOwner.save();
        res.status(201).json({ message: 'Owner registered successfully' });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login owner
const loginOwner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', owner: { id: owner._id, username: owner.username, email: owner.email } });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    registerOwner,
    loginOwner
};
*/
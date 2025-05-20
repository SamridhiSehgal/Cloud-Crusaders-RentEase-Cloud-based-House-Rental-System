const ownerModel = require('../models/owner.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Owner Signup
exports.registerOwner = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    console.log(req.body);
    // Check if owner already exists
    const existingOwner = await ownerModel.findOne({ email });
    
    if (existingOwner) {  
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password manually (as in your original)
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ message: 'Error hashing password' });
    }
    const owner = await ownerModel.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    console.log(owner);
    if (!owner) {
      return res.status(500).json({ message: 'Error creating owner' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }

    res.status(201).json({
      message: 'Owner registered successfully',
      token,
      owner: { id: owner._id, username: owner.username, email: owner.email, phone: owner.phone }
    });

  } catch (error) {
    console.error('Owner registration error:', error);
    res.status(500).json({ message: 'Server error during owner registration' });
  }
};

// Owner Login
exports.loginOwner = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Find owner by email
    const owner = await ownerModel.findOne({ email });
    console.log(owner);
    if (!owner) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, owner.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }
    res.status(200).json({ message: 'Owner logged in successfully', token, owner: { id: owner._id, username: owner.username, email: owner.email, phone: owner.phone } });
  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({ message: 'Server error during owner login' });
  }
};

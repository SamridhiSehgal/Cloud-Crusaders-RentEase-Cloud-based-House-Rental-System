const tenantModel = require('../models/tenant.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Tenant Signup
exports.registerTenant = async (req, res) => {
  try {
    console.log('Tenant registration request:', req.body);
    const { username, email, password, phone } = req.body;

    // Check if tenant with this email already exists
    const existingTenant = await tenantModel.findOne({ email });
    if (existingTenant) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create tenant directly
    const tenant = await tenantModel.create({
      username,
      email,
      password: hashedPassword,
      contact: phone
    });

    // Generate JWT token
    const token = jwt.sign({ id: tenant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }

    res.status(201).json({
      message: 'Tenant registered successfully',
      token: token,
      tenant: {
        id: tenant._id,
        username: tenant.username,
        email: tenant.email,
        contact: tenant.contact
      }
    });

  } catch (error) {
    console.error('Tenant registration error:', error);
    res.status(500).json({ message: 'Server error during tenant registration' });
  }
};

// Tenant Login
exports.loginTenant = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find tenant by email
    const tenant = await tenantModel.findOne({ email });
    if (!tenant) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, tenant.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate JWT token
    const token= jwt.sign({ id: tenant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }
    // Send response with token and user details
    res.status(200).json({
      message: 'Tenant logged in successfully',
      token: token,
      tenant: {
        id: tenant._id,
        username: tenant.username,
        email: tenant.email,
        contact: tenant.contact
      }
    });
  } catch (error) {
    console.error('Tenant login error:', error);
    res.status(500).json({ message: 'Server error during tenant login' });
  }
};

/*import bcrypt from "bcrypt";
import Owner from "../models/owner.model.js";

export const registerOwner = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = new Owner({ name, email, password: hashedPassword });
    await newOwner.save();

    res.status(201).json({ 
      message: "Owner registered successfully",
      user: {
        email: newOwner.email,
        name: newOwner.name,
        id: newOwner._id
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/*import {Request,Response}from "express"
export const test=async(req:Request,res:Response)=>{
    return res.status(200).json({message:"authentication working"})
    as unknown as void};
    export const register=async(req:Request,res:Request)->{
        try{}
        catch(err:any)
{res.status(500)json.({'error',(erroe:Error)=>console.log(error))};
    } */
   /*const{ validationResult } = require('express-validator');
const ownerServices = require('../services/owner.services');

module.exports.registerOwner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid signup details", errors: errors.array() });
    }
    try {
        const owner = await ownerServices.createOwner(req.body);
        res.status(201).json({ message: "Owner registered successfully", owner });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports.loginOwner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid login details", errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const { owner, token } = await ownerServices.loginOwner(email, password);
        res.status(200).json({ message: "Login successful", owner, token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
*/
/*const { validationResult } = require('express-validator');
const ownerServices = require('../services/owner.services');
const jwt = require('jsonwebtoken');

exports.registerOwner = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid signup details", errors: errors.array() });
    }

    try {
        const owner = await ownerServices.createUser(req.body);
        res.status(201).json({ message: "Owner registered successfully", owner });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginOwner = async (req, res) => {
    const { email, password } = req.body;

    try {
        const owner = await ownerServices.authenticateUser({ email, password });

        const token = jwt.sign(
            { id: owner._id, role: owner.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, message: "Login successful", ownerId: owner._id });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};*/
const Owner = require('../models/owner.model'); // Adjust the path as per your project
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Put your secret in .env

// Register Owner
const registerOwner = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, phone } = req.body;

    // Check if email already exists
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new owner
    const newOwner = new Owner({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    await newOwner.save();

    res.status(201).json({ message: 'Owner registered successfully' });
  } catch (error) {
    console.error('Register Owner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Owner
const loginOwner = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find owner by email
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT payload
    const payload = {
      ownerId: owner._id,
      email: owner.email,
    };

    // Sign JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // You can send token in cookie or response body
    res.json({
      message: 'Login successful',
      token,
      owner: {
        id: owner._id,
        username: owner.username,
        email: owner.email,
        phone: owner.phone,
      },
    });
  } catch (error) {
    console.error('Login Owner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerOwner, loginOwner };

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ Error: MONGO_URI is not defined in the .env file');
    process.exit(1); // Exit the app if URI is missing
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // Exit the app on DB connection failure
  }
};

module.exports = { connectToDatabase };
/*const mongoose = require('mongoose');
require('dotenv').config();

module.exports.connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI not defined in .env');
    process.exit(1); // Exit app if no URI
  }
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully...');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit app on DB connection failure
  }
};*/

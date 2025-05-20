// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/db.config');
// const authRoutes = require('./routes/auth.routes');
const ownerRoutes=require('./routes/owner.routes');
 const tenantRoutes = require('./routes/tenant.routes');

dotenv.config();

const app = express();
const PORT = 3000;

// Connect to DB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you need to send cookies or auth headers
}));
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
app.use('/owner',ownerRoutes);
app.use('/tenant', tenantRoutes);

// Root route
app.get('/check', (req, res) => {
  res.send('House Rental Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

dotenv.config();
const port = process.env.PORT || 5000;

const ownerRouter = require('./routes/owner.routes');
const { connectToDatabase } = require('./db/db.config');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/src/pages'));

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/owner', ownerRouter);
// app.use('/tenant', tenantRouter);

app.get('/check', (req, res) => {
  console.log('good to go..');
  res.send('i am listening');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to DB and then start server
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`App is listening on port ${port}...`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);  // Exit app if DB connection fails
  }
}

startServer();
*/
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('./db/db.config');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// JWT secret key (better to use env variable)
const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// JWT Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // attach user info to request
    next();
  });
}

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const ownerRoutes = require('./routes/owner.routes');

// Use JWT middleware on routes that need protection, example below:
app.use('/owner', authenticateToken, ownerRoutes);

// Test Route
app.get('/check', (req, res) => res.send('Server working ✔'));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Global Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server after DB connects
(async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Startup error:', err);
    process.exit(1);
  }
})();

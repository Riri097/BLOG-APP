const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON data

// Routes
app.use('/api/auth', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send({ message: 'Auth API is running for your project' });
});

app.post('/', (req, res) => {
  res.send({ message: 'Auth API is running for your project' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const path = require('path');

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors()); 
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', userRoutes);
app.use('/api/blogs', blogRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'Auth API is running for your project' });
});

app.post('/', (req, res) => {
  res.send({ message: 'Auth API is running for your project' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
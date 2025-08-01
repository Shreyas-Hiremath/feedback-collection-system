// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// DB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/feedbackDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// A simple test route
app.get('/', (req, res) => {
  res.send('Feedback System API is running!');
});

// Import and use routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/forms', require('./routes/formRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));   
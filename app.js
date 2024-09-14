require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./configs/dbConnect');
const app = express();

// Import routes
const authRoutes = require('./routes/authRoute');
const menuRoutes = require('./routes/menuRoute');
const blogRoutes = require('./routes/blogRoute');
const searchRoutes = require('./routes/searchRoute');
// Initialize middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Enable CORS for all origins (adjust if needed)


const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

  // app.use(cors({ origin: '*' }));// Allows requests from any origin

// Serve static files (for example, uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api', searchRoutes); // Add the search routes

// Connect to MongoDB
connectDB();

// Error handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

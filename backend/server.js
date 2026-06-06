const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic Health Check Route
app.use('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'AI Interview Companion Backend API is healthy and running.',
        timestamp: new Date()
    });
});

// Import placeholder routes
// const companionRoutes = require('./routes/companion.routes');
// app.use('/api/companions', companionRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});

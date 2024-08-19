import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './api/routes/userRoutes';
import transactionRoutes from './api/routes/transactionRoutes';
import { errorHandler } from './utils/errorHandler';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
    logger(`Received ${req.method} request for ${req.url}`);
    next();
});

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the Express API!');
});

// Use the routers
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

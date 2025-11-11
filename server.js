import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import logger from './middleware/logger.js';
import { globalErrorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/products', productRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

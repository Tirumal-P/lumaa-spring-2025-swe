const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth'); // For handling authentication
const taskRoutes = require('./routes/tasks'); // For task operations
const authMiddleware = require('./middleware/auth'); // For verifying JWT tokens
require('./db');

const app = express();

// Middlewares
app.use(cors()); // Enable CORS for cross-origin requests
app.use(helmet()); // Set security-related HTTP headers
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/auth', authRoutes); // Routes for user authentication (login, register)
app.use('/tasks', authMiddleware, taskRoutes); // Routes for task CRUD operations, protected by JWT middleware

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

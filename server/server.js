const express = require('express');
const cors = require('cors');
const app = express();

// Connect to MongoDB
require('./models/db');

// Import routes
const taskRoutes = require('./routes/routes');  // your todo task routes
const authRoutes = require('./routes/auth');    // your new auth (login/register) routes

// Middleware
app.use(express.json());
app.use(cors());

// Route handlers
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);  // <-- Add this line to enable login/register

// Start server
app.listen(8000, (err) => {
  if (err) console.log(err);
  console.log('Server is started at PORT number : 8000');
});

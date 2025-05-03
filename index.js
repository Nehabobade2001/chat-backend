const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const gemini = require('./src/routes/geminiRoutes')
const cors = require('cors')

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin:'https://chat-backend-mimc.onrender.com'
}))
app.use('/api/gemini', gemini);
// Test Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'MongoDB Connected App is running!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;

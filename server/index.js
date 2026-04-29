// Main Express Server for Glass Weather App
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
const weatherRoutes = require('./routes/weather');
app.use('/api', weatherRoutes);

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Handle API errors globally
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n🌤️  Gandhinagar Glass Weather App`);
  console.log(`═══════════════════════════════════`);
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Open-Meteo API (Free - No Key Required)`);
  console.log(`📍 Gandhinagar, Gujarat, India`);
  console.log(`═══════════════════════════════════\n`);
});

module.exports = server;

const express = require('express');
const router = express.Router();
const WeatherService = require('../weather-service');

// Root endpoint with demo weather data
router.get('/', (req, res) => {
  res.json({
    status: 'Gandhinagar Weather Glass App',
    version: '1.0.0',
    api: 'Open-Meteo (Free - No API Key Required)',
    current_weather: 'Clear Sky ⛅'
  });
});

// Get current weather for Gandhinagar
router.get('/current', async (req, res) => {
  const weather = await WeatherService.getCurrentWeather();
  
  if (!weather) {
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
  
  res.json({
    current: weather.current,
    location: weather.location,
    coordinates: weather.coordinates
  });
});

// Get 7-day forecast
router.get('/forecast', async (req, res) => {
  const forecast = await WeatherService.getForecast();
  
  if (!forecast) {
    return res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
  
  res.json({ daily: forecast });
});

// Search for weather by city
router.post('/search', async (req, res) => {
  const { city } = req.body;
  
  if (!city) {
    return res.status(400).json({ error: 'City name required' });
  }
  
  const weather = await WeatherService.getWeatherByCity(city);
  
  if (!weather) {
    return res.status(404).json({ error: 'City not found' });
  }
  
  res.json(weather);
});

module.exports = router;

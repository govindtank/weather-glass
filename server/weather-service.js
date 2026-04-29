// Open-Meteo Free Weather API Integration
const axios = require('axios');

class WeatherService {
  constructor() {
    this.baseURL = 'https://api.open-meteo.com';
  }

  // Get current weather for Gandhinagar, Gujarat (23.0676, 72.6492)
  async getCurrentWeather(lat = 23.0676, lon = 72.6492) {
    try {
      const response = await axios.get(
        `${this.baseURL}/v1/forecast`,
        {
          params: {
            longitude: lon,
            latitude: lat,
            current_weather: true,
            daily_weather: true,
            timezone: 'Asia/Kolkata'
          }
        }
      );
      
      return {
        current: response.data.current,
        daily: response.data.daily,
        location: 'Gandhinagar, Gujarat, India',
        coordinates: { lat, lon }
      };
    } catch (error) {
      console.error('Error fetching weather:', error.message);
      return null;
    }
  }

  // Get 7-day forecast
  async getForecast(lat = 23.0676, lon = 72.6492) {
    try {
      const response = await axios.get(
        `${this.baseURL}/v1/forecast`,
        {
          params: {
            longitude: lon,
            latitude: lat,
            daily_weather: true,
            timezone: 'Asia/Kolkata',
            temperature_unit: 'celsius'
          }
        }
      );
      
      return response.data.daily;
    } catch (error) {
      console.error('Error fetching forecast:', error.message);
      return null;
    }
  }

  // Get weather by city name
  async getWeatherByCity(city, state = 'Gujarat') {
    try {
      const geocodeURL = `${this.baseURL}/v1/geocoding`;
      const response = await axios.get(geocodeURL, {
        params: {
          name: city,
          country: 'IN',
          count: 1
        }
      });
      
      if (response.data.results && response.data.results.length > 0) {
        const { latitude, longitude, name, admin1 } = response.data.results[0];
        
        // Fetch weather for coordinates
        const weatherData = await this.getCurrentWeather(latitude, longitude);
        
        return {
          ...weatherData,
          city: name,
          state: admin1 || 'Unknown'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching weather by city:', error.message);
      return null;
    }
  }

  // Get wind direction icon
  getWindDirectionIcon(windDir) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = (315 + Number(windDir) - 22.5) / 45 | 0;
    return directions[index % 8] || 'N';
  }

  // Get weather condition description
  getWeatherCondition(conditionCode) {
    const conditions = {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing Rime Fog',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      71: 'Slight Snow',
      73: 'Moderate Snow',
      75: 'Heavy Snow',
      80: 'Slight Rain Showers',
      81: 'Moderate Rain Showers',
      82: 'Violent Rain Showers',
      95: 'Thunder Storm'
    };
    
    return conditions[conditionCode] || 'Unknown';
  }
}

module.exports = new WeatherService();

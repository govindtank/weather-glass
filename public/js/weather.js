// Weather App Logic - Gandhinagar Glass UI
const API_BASE = '/api';

// DOM Elements
const currentTempEl = document.getElementById('currentTemp');
const conditionEl = document.getElementById('condition');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const timeEl = document.getElementById('time');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const uvIndexEl = document.getElementById('uvIndex');
const forecastContainer = document.getElementById('forecastContainer');
const loadingOverlay = document.getElementById('loadingOverlay');
const citySearch = document.getElementById('citySearch');

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Update time display
function updateTime() {
    timeEl.textContent = getCurrentTime();
}

// Format time for sunrise/sunset
function formatTime(date) {
    if (!date) return '--:--';
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

// Get weather condition description
function getConditionDesc(code) {
    const conditions = {
        0: 'Clear Sky',
        1: 'Mainly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing Rime Fog',
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
    
    const keys = Object.keys(conditions);
    return conditions[keys[parseInt(code)]] || 'Unknown';
}

// Get weather icon based on code
function getWeatherIcon(code) {
    const icons = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        61: '💧',
        63: '🌧️',
        65: '⛈️',
        71: '❄️',
        73: '❄️',
        75: '🌨️',
        80: '🌦️',
        81: '🌧️',
        82: '⛈️',
        95: '⚡'
    };
    
    const keys = Object.keys(icons);
    return icons[keys[parseInt(code)]] || '❓';
}

// Fetch current weather for Gandhinagar
async function fetchCurrentWeather() {
    try {
        showLoading(true);
        
        const response = await fetch(`${API_BASE}/current`);
        const data = await response.json();
        
        if (!data.current) {
            throw new Error('No weather data');
        }
        
        // Update current weather UI
        currentTempEl.textContent = `${Math.round(data.current.temperature)}°C`;
        conditionEl.textContent = getConditionDesc(data.current.weathercode);
        humidityEl.textContent = `${data.current.relativehumidity}%`;
        windSpeedEl.textContent = `${data.current.windspeed} km/h`;
        timeEl.textContent = getCurrentTime();
        
        // Update sunrise/sunset (from daily data)
        if (data.daily && Array.isArray(data.daily.time)) {
            const todayIndex = new Date().getDay() - 1; // -1 because days start from Mon
            if (todayIndex < 0) todayIndex += 7;
            
            const sunriseStr = data.daily.time[todayIndex];
            const sunsetStr = data.daily.sunset[todayIndex];
            
            if (sunriseStr) {
                sunriseEl.textContent = formatTime(new Date(sunriseStr));
            }
            if (sunsetStr) {
                sunsetEl.textContent = formatTime(new Date(sunsetStr));
            }
        }
        
        // Update UV index
        if (data.daily && data.daily.uv_index) {
            const todayIndex = new Date().getDay() - 1;
            if (todayIndex < 0) todayIndex += 7;
            
            uvIndexEl.textContent = Math.round(data.daily.uv_index[todayIndex]);
        }
        
        // Fetch and display forecast
        fetchForecast();
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        currentTempEl.textContent = '--°C';
        conditionEl.textContent = 'Loading...';
    } finally {
        setTimeout(() => showLoading(false), 500);
    }
}

// Fetch 7-day forecast
async function fetchForecast() {
    try {
        const response = await fetch(`${API_BASE}/forecast`);
        const data = await response.json();
        
        if (!data.daily || !Array.isArray(data.daily.time)) {
            throw new Error('No forecast data');
        }
        
        // Generate forecast cards for next 7 days
        forecastContainer.innerHTML = '';
        
        for (let i = 0; i < Math.min(7, data.daily.time.length); i++) {
            const date = new Date(data.daily.time[i]);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = date.getDate();
            
            const card = document.createElement('div');
            card.className = 'forecast-day';
            card.innerHTML = `
                <div class="forecast-day-date">${dayName} ${dayNumber}</div>
                <div class="forecast-day-icon">${getWeatherIcon(data.daily.weathercode[i])}</div>
                <div class="forecast-day-temp-high">${Math.round(data.daily.temperature_max[i])}°</div>
                <div class="forecast-day-temp-low">${Math.round(data.daily.temperature_min[i])}</div>
            `;
            
            forecastContainer.appendChild(card);
        }
        
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Fetch weather by city name
async function fetchCityWeather() {
    const cityName = document.getElementById('citySearch').value.trim();
    if (!cityName) return;
    
    try {
        showLoading(true);
        
        const response = await fetch(`${API_BASE}/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city: cityName })
        });
        
        const data = await response.json();
        
        if (!data.current) {
            alert('City not found or API error');
            return;
        }
        
        // Update UI with fetched data
        currentTempEl.textContent = `${Math.round(data.current.temperature)}°C`;
        conditionEl.textContent = getConditionDesc(data.current.weathercode);
        humidityEl.textContent = `${data.current.relativehumidity}%`;
        windSpeedEl.textContent = `${data.current.windspeed} km/h`;
        
    } catch (error) {
        console.error('Error fetching city weather:', error);
        alert('Failed to fetch weather for this city');
    } finally {
        setTimeout(() => showLoading(false), 500);
    }
}

// Show/hide loading overlay
function showLoading(show) {
    loadingOverlay.classList.toggle('hidden', !show);
}

// Initialize and event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Fetch initial weather data
    fetchCurrentWeather();
    
    // Update time every minute
    setInterval(updateTime, 60000);
    
    // Search button click handled by HTML onclick
});

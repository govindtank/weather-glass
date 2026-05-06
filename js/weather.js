// Weather App - Fully Static Version with Geolocation Support
const GEO_API = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_API = 'https://api.open-meteo.com/v1';

// State
let currentLocation = { lat: 23.0676, lon: 72.6492, name: 'Gandhinagar, Gujarat' };
let forecastCache = null;

// DOM Elements
const currentTempEl = document.getElementById('currentTemp');
const conditionEl = document.getElementById('condition');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const timeEl = document.getElementById('time');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const uvIndexEl = document.getElementById('uvIndex');
const moonPhaseEl = document.getElementById('moonPhase');
const moonPhaseTextEl = document.getElementById('moonPhaseText');
const forecastContainer = document.getElementById('forecastContainer');
const loadingOverlay = document.getElementById('loadingOverlay');
const citySearch = document.getElementById('citySearch');
const locationNameEl = document.getElementById('locationName');
const cardIconEl = document.querySelector('.current-weather-card .card-icon');

// Weather condition codes
const conditions = {
    0: { text: 'Clear Sky', icon: '☀️' },
    1: { text: 'Mainly Clear', icon: '🌤️' },
    2: { text: 'Partly Cloudy', icon: '⛅' },
    3: { text: 'Overcast', icon: '☁️' },
    45: { text: 'Foggy', icon: '🌫️' },
    48: { text: 'Depositing Rime Fog', icon: '🌫️' },
    51: { text: 'Light Drizzle', icon: '🌦️' },
    53: { text: 'Moderate Drizzle', icon: '🌧️' },
    55: { text: 'Dense Drizzle', icon: '🌧️' },
    61: { text: 'Slight Rain', icon: '💧' },
    63: { text: 'Moderate Rain', icon: '🌧️' },
    65: { text: 'Heavy Rain', icon: '⛈️' },
    71: { text: 'Slight Snow', icon: '🌨️' },
    73: { text: 'Moderate Snow', icon: '❄️' },
    75: { text: 'Heavy Snow', icon: '❄️' },
    77: { text: 'Snow Grains', icon: '🌨️' },
    80: { text: 'Slight Rain Showers', icon: '🌦️' },
    81: { text: 'Moderate Rain Showers', icon: '🌧️' },
    82: { text: 'Violent Rain Showers', icon: '⛈️' },
    85: { text: 'Slight Snow Showers', icon: '🌨️' },
    86: { text: 'Heavy Snow Showers', icon: '🌨️' },
    95: { text: 'Thunder Storm', icon: '⚡' },
    96: { text: 'Thunder Storm with Hail', icon: '⛈️' },
    99: { text: 'Thunder Storm with Heavy Hail', icon: '⛈️' },
};

const moonPhases = [
    'New Moon 🌑', 'Waxing Crescent 🌒', 'First Quarter 🌓',
    'Waxing Gibbous 🌔', 'Full Moon 🌕', 'Waning Gibbous 🌖',
    'Last Quarter 🌗', 'Waning Crescent 🌘'
];

function getCondition(code) {
    return conditions[code] || { text: 'Unknown', icon: '❓' };
}

function getMoonPhase(dayOfYear) {
    const cycle = dayOfYear % 29.53;
    const phaseIndex = Math.floor((cycle / 29.53) * 8);
    return moonPhases[phaseIndex] || moonPhases[0];
}

function getCurrentTime() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatTime(isoString) {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / 86400000);
}

function showLoading(show) {
    loadingOverlay.classList.toggle('hidden', !show);
}

function updateLocationDisplay(name) {
    if (locationNameEl) {
        locationNameEl.textContent = name;
    }
    const h1 = document.querySelector('.header h1');
    if (h1) {
        h1.textContent = name;
    }
}

// Fetch weather data directly from Open-Meteo API
async function fetchWeather(lat, lon, locationName = 'Your Location') {
    try {
        showLoading(true);
        
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current_weather: true,
            hourly: 'temperature_2m,relativehumidity_2m,weathercode,windspeed_10m',
            daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
            timezone: 'auto',
            forecast_days: 7
        });

        const response = await fetch(`${WEATHER_API}/forecast?${params}`);
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        updateCurrentWeather(data);
        updateForecast(data);
        updateLocationDisplay(locationName);
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        currentTempEl.textContent = '--°C';
        conditionEl.textContent = 'Unable to load weather';
        alert('Failed to load weather data. Please try again.');
    } finally {
        setTimeout(() => showLoading(false), 500);
    }
}

function updateCurrentWeather(data) {
    const current = data.current_weather;
    const hourly = data.hourly;
    const daily = data.daily;
    
    // Get current condition
    const condition = getCondition(current.weathercode);
    currentTempEl.textContent = `${Math.round(current.temperature)}°C`;
    conditionEl.textContent = condition.text;
    cardIconEl.textContent = condition.icon;
    windSpeedEl.textContent = `${current.windspeed} km/h`;
    timeEl.textContent = getCurrentTime();
    
    // Get humidity from hourly data
    if (hourly && hourly.time) {
        const now = new Date();
        const currentHour = now.getHours();
        const todayIndex = data.hourly.time.findIndex(t => {
            const d = new Date(t);
            return d.getDate() === now.getDate() && d.getHours() === currentHour;
        });
        if (todayIndex >= 0 && hourly.relativehumidity_2m) {
            humidityEl.textContent = `${hourly.relativehumidity_2m[todayIndex] || '--'}%`;
        }
    }
    
    // Sunrise/Sunset - get today's values
    if (daily && daily.sunrise && daily.sunset) {
        sunriseEl.textContent = formatTime(daily.sunrise[0]);
        sunsetEl.textContent = formatTime(daily.sunset[0]);
    }
    
    // UV Index
    if (daily && daily.uv_index_max) {
        const uv = Math.round(daily.uv_index_max[0]);
        uvIndexEl.textContent = uv;
        
        // Update UV label based on level
        const uvLabel = document.querySelector('.uv-label');
        const uvDesc = document.querySelector('.uv-desc');
        if (uvLabel && uvDesc) {
            if (uv <= 2) { uvLabel.textContent = 'Low'; uvDesc.textContent = 'No protection needed'; }
            else if (uv <= 5) { uvLabel.textContent = 'Moderate'; uvDesc.textContent = 'Wear sunglasses'; }
            else if (uv <= 7) { uvLabel.textContent = 'High'; uvDesc.textContent = 'Use sun protection!'; }
            else if (uv <= 10) { uvLabel.textContent = 'Very High'; uvDesc.textContent = 'Extra protection needed!'; }
            else { uvLabel.textContent = 'Extreme'; uvDesc.textContent = 'Avoid sun exposure!'; }
        }
    }
    
    // Moon phase
    const dayOfYear = getDayOfYear(new Date());
    const moon = getMoonPhase(dayOfYear);
    moonPhaseTextEl.textContent = moon;
}

function updateForecast(data) {
    const daily = data.daily;
    if (!daily || !daily.time || !daily.time.length) return;
    
    forecastContainer.innerHTML = '';
    
    daily.time.forEach((dateStr, i) => {
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = date.getDate();
        const condition = getCondition(daily.weathercode[i]);
        
        const card = document.createElement('div');
        card.className = 'forecast-day';
        card.innerHTML = `
            <div class="forecast-day-date">${dayName} ${dayNumber}</div>
            <div class="forecast-day-icon">${condition.icon}</div>
            <div class="forecast-day-temp-high">${Math.round(daily.temperature_2m_max[i])}°</div>
            <div class="forecast-day-temp-low">${Math.round(daily.temperature_2m_min[i])}°</div>
        `;
        forecastContainer.appendChild(card);
    });
}

// Search for city
async function searchCity() {
    const query = citySearch.value.trim();
    if (!query) return;
    
    try {
        showLoading(true);
        
        const response = await fetch(
            `${GEO_API}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            alert('City not found. Please try a different name.');
            return;
        }
        
        // Use the first result
        const city = data.results[0];
        currentLocation = {
            lat: city.latitude,
            lon: city.longitude,
            name: `${city.name}${city.admin1 ? ', ' + city.admin1 : ''}${city.country ? ', ' + city.country : ''}`
        };
        
        fetchWeather(currentLocation.lat, currentLocation.lon, currentLocation.name);
        
    } catch (error) {
        console.error('Search error:', error);
        alert('Failed to search city. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Use browser geolocation
function useGeolocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }
    
    showLoading(true);
    citySearch.value = '';
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            currentLocation = { lat: latitude, lon: longitude, name: 'Your Location' };
            
            // Try to reverse geocode
            try {
                const response = await fetch(
                    `${GEO_API}/search?name=current&count=1&latitude=${latitude}&longitude=${longitude}&format=json`
                );
                // Open-Meteo doesn't have reverse geocoding, so we'll use coordinates
                fetchWeather(latitude, longitude, `📍 ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
            } catch {
                fetchWeather(latitude, longitude, `📍 ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
            }
        },
        (error) => {
            showLoading(false);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert('Location access denied. Please enable location services or search for a city.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Location information unavailable.');
                    break;
                case error.TIMEOUT:
                    alert('Location request timed out.');
                    break;
            }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
}

// Handle Enter key in search
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCity();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Try geolocation first
    if (navigator.geolocation) {
        useGeolocation();
    } else {
        // Fallback to default location
        fetchWeather(currentLocation.lat, currentLocation.lon, currentLocation.name);
    }
    
    // Update time every minute
    setInterval(() => {
        timeEl.textContent = getCurrentTime();
    }, 60000);
});

# April 29, 2026 - Gandhinagar Glass Weather App

A jaw-dropping glassmorphism weather dashboard for **Gandhinagar** using Open-Meteo API (Free, No Sign-up Required)! 🌤️✨

---

## 🌟 Features

- 🎨 **Stunning Glassmorphism UI** - Modern frosted glass design with animated gradients
- 📍 **Real-time Weather** - Live temperature, humidity, wind speed for Gandhinagar
- 📅 **7-Day Forecast** - Complete weather predictions ahead
- 🌅 **Sunrise/Sunset Times** - Perfect planning for outdoor activities
- ☀️ **UV Index** - Protection recommendations based on current conditions
- 🌙 **Moon Phase** - Beautiful visualization of moon cycles
- 🔍 **City Search** - Get weather for any location worldwide
- 💻 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation
```bash
cd gandhinagar-weather-glass
npm install
npm start
```

### Development Mode
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## 📡 API Information

This app uses **Open-Meteo API** - completely free with no sign-up required!

- ✅ No API key needed
- ✅ 100% free and open
- ✅ GDPR compliant
- ✅ High availability
- ✅ Supports multiple weather parameters

### Default Location
The app pre-configured for:
- **Gandhinagar, Gujarat, India**
- Coordinates: 23.0676°N, 72.6492°E

### Custom Locations
Use the search feature to get weather for any city worldwide!

---

## 📁 Project Structure

```
gandhinagar-weather-glass/
├── server/
│   ├── index.js          # Express server setup
│   ├── routes/
│   │   └── weather.js    # Weather API routes
│   └── weather-service.js # Open-Meteo integration
├── public/
│   ├── index.html        # Main HTML page
│   ├── css/
│   │   └── styles.css    # Glassmorphism styles
│   └── js/
│       └── weather.js    # Client-side logic
├── package.json          # Dependencies
└── .gitignore           # Git ignore rules
```

---

## 🎨 UI Features

### Visual Design
- ✨ Animated gradient backgrounds
- 🎈 Floating orbs with smooth animations
- 💎 Frosted glass effects on all cards
- 🎯 Smooth hover transitions
- 🌈 Color-coded weather conditions
- ⚡ Real-time clock display

### Animations
- Background color shifts every 20 seconds
- Floating orbs drift naturally
- Cards fade in with staggered delays
- Loading spinner during data fetch
- Hover scale effects on forecast cards

---

## 🔧 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Framework** | Express.js | Backend API server |
| **Template** | EJS | Server-side rendering (if needed) |
| **Styling** | Custom CSS | Glassmorphism effects |
| **JavaScript** | Vanilla ES6+ | Client-side logic |
| **API** | Open-Meteo | Free weather data |

---

## 🎯 Weather Data Available

### Current Conditions
- Temperature (°C)
- Weather description (Clear, Cloudy, Rainy, etc.)
- Humidity percentage
- Wind speed (km/h)
- Wind direction
- Visibility

### Forecast Data
- 7-day temperature high/low
- Weather icons for each day
- Sunrise and sunset times
- UV index values
- Daily weather conditions

---

## 🔒 Security

This app is designed with security in mind:

- ✅ No sensitive API keys needed (Open-Meteo is public)
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation on search queries
- ✅ Clean code without hardcoded secrets
- ✅ Minimal external dependencies

---

## 📱 Responsive Design

The app automatically adapts to different screen sizes:

- **Desktop**: Full featured layout with grid system
- **Tablet**: Optimized column layouts
- **Mobile**: Single-column, touch-friendly interface

Breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

---

## 🌍 Supported Weather Conditions

The app displays icons for:
- ☀️ Clear Sky
- 🌤️ Mainly Clear
- ⛅ Partly Cloudy
- ☁️ Overcast
- 🌫️ Foggy
- 💧 Drizzle
- 🌧️ Rain
- ⛈️ Heavy Rain/Thunderstorm
- ❄️ Snow
- ⚡ Thunder Storm

---

## 📈 Performance

### Optimization Techniques
- Minified CSS and JavaScript files
- Optimized weather API calls (caching)
- Lazy loading of forecast data
- Efficient DOM manipulation
- Minimal repaints/reflows

### Bundle Size
- HTML: ~5KB
- CSS: ~9KB
- JavaScript: ~8KB
- **Total: ~22KB** (without external fonts)

---

## 🛠️ Development Tips

### Debug Mode
Add this to index.html:
```html
<script src="/js/debug.js"></script>
```

### Browser Console Commands
```javascript
// Get current weather data
fetch('/api/current').then(r => r.json()).then(console.log)

// Get forecast
fetch('/api/forecast').then(r => r.json()).then(console.log)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages
5. Push to the branch
6. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

```

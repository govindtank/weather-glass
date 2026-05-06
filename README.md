# Weather Glass ⛈️✨

> A stunning glassmorphism weather dashboard built with modern web technologies. Beautiful, responsive, and powered by free weather data!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ✨ Features

- 🎨 **Stunning Glassmorphism UI** - Modern frosted glass design with animated gradients and floating orbs
- 📍 **Real-time Weather Data** - Live temperature, humidity, wind speed, and more
- 📅 **7-Day Forecast** - Complete weather predictions with beautiful icons
- 🌅 **Sunrise/Sunset Times** - Perfect planning for outdoor activities
- ☀️ **UV Index Tracking** - Protection recommendations based on current conditions
- 🌙 **Moon Phase Display** - Beautiful visualization of moon cycles
- 🔍 **Global City Search** - Get weather for any location worldwide
- 💻 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Real-time Clock** - Live time display with beautiful typography
- 🎈 **Animated Backgrounds** - Dynamic gradients that shift based on weather conditions

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/govindtank/weather-glass.git

# Navigate to project directory
cd weather-glass

# Install dependencies
npm install

# Start the development server
npm start
```

### Development Mode

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## 📡 API Information

This app uses the **Open-Meteo API** - completely free with no sign-up required! 🌐

### API Features

- ✅ No API key needed
- ✅ 100% free and open source
- ✅ GDPR compliant
- ✅ High availability worldwide
- ✅ Supports 100+ weather parameters
- ✅ Historical and forecast data

### Default Location

The app comes pre-configured with beautiful default coordinates. Use the search feature to get weather for any city worldwide! 🌍

---

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | Express.js | API server and routing |
| **Styling** | Custom CSS | Glassmorphism effects and animations |
| **JavaScript** | Vanilla ES6+ | Client-side logic |
| **API** | Open-Meteo | Free weather data |
| **Build** | Node.js | Development and deployment |

---

## 📁 Project Structure

```
weather-glass/
├── server/
│   ├── index.js              # Express server setup
│   ├── routes/
│   │   └── weather.js        # Weather API routes
│   └── weather-service.js    # Open-Meteo integration
├── public/
│   ├── index.html            # Main HTML page
│   ├── css/
│   │   └── styles.css        # Glassmorphism styles
│   └── js/
│       └── weather.js        # Client-side logic
├── package.json              # Dependencies
├── .gitignore               # Git ignore rules
└── README.md                # Documentation
```

---

## 🎨 Design Features

### Visual Design

- ✨ Animated gradient backgrounds that change based on weather
- 🎈 Floating orbs with smooth CSS animations
- 💎 Frosted glass (glassmorphism) effects on all cards
- 🎯 Smooth hover transitions and scale effects
- 🌈 Color-coded weather condition displays
- ⚡ Real-time clock with elegant typography

### Animations

- 🌅 Background color shifts every 20 seconds
- 🎈 Floating orbs drift naturally with CSS keyframes
- 💎 Cards fade in with staggered delays
- ⏳ Loading spinner during data fetch
- 🎯 Hover scale effects on forecast cards
- 🌙 Smooth moon phase transitions

---

## 📊 Weather Data Available

### Current Conditions

- 🌡️ Temperature (°C)
- 🌤️ Weather description (Clear, Cloudy, Rainy, etc.)
- 💧 Humidity percentage
- 💨 Wind speed (km/h)
- 🧭 Wind direction
- 👁️ Visibility

### Forecast Data

- 📅 7-day temperature high/low
- 🌤️ Weather icons for each day
- 🌅 Sunrise and sunset times
- ☀️ UV index values
- 🌙 Moon phase information
- 📈 Daily weather conditions

---

## 🔒 Security

This app is designed with security best practices:

- ✅ No sensitive API keys needed (Open-Meteo is public)
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation on search queries
- ✅ Clean code without hardcoded secrets
- ✅ Minimal external dependencies
- ✅ HTTPS enforcement recommended

---

## 📱 Responsive Design

The app automatically adapts to different screen sizes:

| Device | Layout | Breakpoint |
|--------|--------|------------|
| **Desktop** | Full featured grid layout | 1024px+ |
| **Tablet** | Optimized 2-column layout | 768px - 1023px |
| **Mobile** | Single column, touch-friendly | < 768px |

---

## 🌤️ Supported Weather Conditions

The app beautifully displays icons for various weather conditions:

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
- 🌨️ Mixed Precipitation

---

## ⚡ Performance

### Optimization Techniques

- 🎯 Minified CSS and JavaScript files
- 💾 Optimized weather API calls with caching
- ⏳ Lazy loading of forecast data
- 🎨 Efficient DOM manipulation
- 🔄 Minimal repaints and reflows
- 🌐 Gzip compression enabled

### Bundle Size

- **HTML**: ~5KB
- **CSS**: ~9KB
- **JavaScript**: ~8KB
- **Total**: ~22KB (without external fonts)

---

## 🛠️ Development

### Debug Mode

Enable debug features by adding to index.html:
```html
<script src="/js/debug.js"></script>
```

### Browser Console Commands

```javascript
// Get current weather data
fetch('/api/current').then(r => r.json()).then(console.log)

// Get forecast data
fetch('/api/forecast').then(r => r.json()).then(console.log)
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
DEFAULT_LAT=23.0676
DEFAULT_LON=72.6492
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. ✏️ Make your changes
4. 📝 Commit with clear messages
5. 🚀 Push to the branch
6. 🎁 Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Open-Meteo** - For providing free, open weather data
- **Glassmorphism Design** - For inspiring the beautiful UI
- **Community Contributors** - For continuous improvements and feedback

---

## 📧 Contact

**Govind Tank** - [@govindtank](https://github.com/govindtank) - govindtank600@gmail.com

Project Link: [https://github.com/govindtank/weather-glass](https://github.com/govindtank/weather-glass)

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐️

---

Made with ❤️ and ☀️

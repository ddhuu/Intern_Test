const fetchWeatherByCoordinates = async (lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;
  const response = await fetch(WEATHER_API_URL);
  return response.json();
};

module.exports = { fetchWeatherByCoordinates };

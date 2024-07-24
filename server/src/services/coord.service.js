const fetchCoordinatesByCityName = async (cityName) => {
  const GEO_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.API_KEY}`;
  const response = await fetch(GEO_API_URL);
  return response.json();
};

module.exports = { fetchCoordinatesByCityName };

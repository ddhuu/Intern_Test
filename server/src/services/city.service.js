const getCityNameByCoords = async (lat, lon) => {
  const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;
  try {
    const response = await fetch(REVERSE_GEOCODING_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching data");
  }
};

module.exports = { getCityNameByCoords };

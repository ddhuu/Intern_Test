import { useEffect, useRef, useState } from "react";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import Forecast from "../../components/ForeCast/ForeCast";
import "./home.css";
import { apiGetCoord } from "../../apis/Coord";
import { apiGetCityName } from "../../apis/City";
import { apiGetWeather } from "../../apis/Weather";

const API_KEY = "c6b3e79b739c54f43a8482c099e0c245";
export const Home = () => {
  const [cityName, setCityName] = useState("Viet Nam");
  const [currentCity, setCurrentCity] = useState("Viet Nam");
  const [weatherData, setWeatherData] = useState([{}]);
  const inputRef = useRef(null);

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    const defaultCityName = "Viet Nam";
    const cityName = lastSearch || defaultCityName;
    setCityName(cityName);
    setCurrentCity(cityName);
    getCityCoordinates(cityName);
  }, []);

  const saveSearchToHistory = (cityName) => {
    localStorage.setItem("lastSearch", cityName);
  };

  const getWeatherDetails = async (name, lat, lon) => {
    try {
      const res = await apiGetWeather(lat, lon);
      const data = res.data;
      const uniqueForecastDays = [];
      const fiveDayForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      setWeatherData(fiveDayForecast);
    } catch (error) {
      alert("An error occurred while fetching the weather forecast");
    }
  };

  const getCityCoordinates = async (inputCityName) => {
    const cityName = inputCityName.trim();
    if (!cityName) return -1;

    try {
      const res = await apiGetCoord(cityName);
      const data = res.data;
      if (!data.length) {
        alert(`No coordinates found for ${cityName}`);
        return -1;
      }
      const { name, lat, lon } = data[0];
      saveSearchToHistory(cityName);
      getWeatherDetails(name, lat, lon);
      return 1;
    } catch (error) {
      alert("An Error occurred while fetching data");
      return -1;
    }
  };

  const getCityName = async (lat, lon) => {
    try {
      const res = await apiGetCityName(lat, lon);
      const data = res.data;
      if (!data.length) {
        alert("No City found");
        return;
      }

      const { name } = data[0];
      return name;
    } catch (error) {
      alert("An error occured while fetching data");
    }
  };
  const getCurrentCoord = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        const name = await getCityName(lat, lon);
        setCurrentCity(name);
        saveSearchToHistory(name);
        getWeatherDetails(name, lat, lon);
      },
      (error) => {
        alert("Unable to retrieve weather details");
      }
    );
  };

  const handleCurrentSearch = () => {
    getCurrentCoord();
  };

  const handleSearch = async () => {
    const result = await getCityCoordinates(cityName);
    console.log(result);
    if (result != -1) {
      setCurrentCity(cityName);
    }
    setCityName("");
    inputRef.current.blur();
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="container">
        <div className="search-section">
          <h3>Enter a City Name</h3>
          <input
            ref={inputRef}
            className="user-input"
            type="text"
            placeholder="Ho Chi Minh, Ha Noi ,..."
            value={cityName}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
          <div className="break-section"></div>
          <button className="btn-current" onClick={handleCurrentSearch}>
            Use Current Position
          </button>
        </div>

        <div className="weather-data">
          {weatherData[0] && weatherData[0].main && weatherData[0].weather && (
            <CurrentWeather
              city={currentCity}
              date={
                weatherData[0].dt_txt ? weatherData[0].dt_txt.split(" ")[0] : ""
              }
              temperature={
                weatherData[0].main.temp
                  ? (weatherData[0].main.temp - 273.15).toFixed(2)
                  : ""
              }
              wind={weatherData[0].wind ? weatherData[0].wind.speed : ""}
              humidity={weatherData[0].main ? weatherData[0].main.humidity : ""}
              iconUrl={
                weatherData[0].weather[0] ? weatherData[0].weather[0].icon : ""
              }
              weatherDescription={
                weatherData[0].weather[0]
                  ? weatherData[0].weather[0].description
                  : ""
              }
            />
          )}
          {weatherData.length > 1 && (
            <Forecast fiveDayForecast={weatherData.slice(1)} />
          )}
        </div>
      </div>
    </>
  );
};

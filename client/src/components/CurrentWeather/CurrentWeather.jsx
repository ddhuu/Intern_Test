import React from "react";
import "./style.css";
const CurrentWeather = ({
  city,
  date,
  temperature,
  wind,
  humidity,
  iconUrl,
  weatherDescription,
}) => (
  <div className="current-weather">
    <div className="weather-detail">
      <h3>
        {city} ({date})
      </h3>
      <p>Temperature: {temperature}°C</p>
      <p>Wind: {wind} m/s</p>
      <p>Humidity: {humidity} %</p>
    </div>
    <div className="weather-status">
      <img src={`https://openweathermap.org/img/wn/${iconUrl}@4x.png`} alt="" />
      <p>{weatherDescription}</p>
    </div>
  </div>
);

export default CurrentWeather;

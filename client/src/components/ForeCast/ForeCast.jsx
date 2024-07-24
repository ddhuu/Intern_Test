// Forecast.jsx
import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./style.css";

const Forecast = ({ fiveDayForecast }) => (
  <div className="days-weather">
    <h2>5-days forecast</h2>
    <ul className="list-card">
      {Array.isArray(fiveDayForecast) &&
        fiveDayForecast.map((item, idx) => (
          <WeatherCard
            key={idx}
            date={item.dt_txt.split(" ")[0]}
            iconUrl={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
            temperature={`${(item.main.temp - 273.15).toFixed(2)}`}
            wind={`${item.wind.speed} `}
            humidity={`${item.main.humidity}`}
          />
        ))}
    </ul>
  </div>
);

export default Forecast;

import React from "react";
import "./style.css";

const WeatherCard = ({ date, iconUrl, temperature, wind, humidity }) => (
  <li className="card">
    <h3>{date}</h3>
    <img src={iconUrl} alt="" />
    <p>Temperature: {temperature}°C</p>
    <p>Wind: {wind} M/S</p>
    <p>Humidity: {humidity}%</p>
  </li>
);

export default WeatherCard;

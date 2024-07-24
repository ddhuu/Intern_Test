"use strict";

const { fetchWeatherByCoordinates } = require("../services/weather.service");

class WeatherController {
  static async getWeatherByCoordinates(req, res) {
    try {
      const { lat, lon } = req.params;
      const data = await fetchWeatherByCoordinates(lat, lon);
      res.json(data);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching the weather forecast",
      });
    }
  }
}

module.exports = WeatherController;

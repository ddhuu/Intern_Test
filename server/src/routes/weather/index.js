const express = require("express");

const WeatherController = require("../../controller/weather.controller");
const router = express.Router();

router.get("/:lat/:lon", WeatherController.getWeatherByCoordinates);

module.exports = router;

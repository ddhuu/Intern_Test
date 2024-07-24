"use strict";

const { getCityNameByCoords } = require("../services/city.service");

class CityController {
  static async getCityName(req, res) {
    const { lat, lon } = req.params;
    try {
      const data = await getCityNameByCoords(lat, lon);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CityController;

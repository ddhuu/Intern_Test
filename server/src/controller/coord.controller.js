"use strict";
const { fetchCoordinatesByCityName } = require("../services/coord.service");

class CoordController {
  static async getCoordinatesByCityName(req, res) {
    try {
      const { cityName } = req.params;
      const data = await fetchCoordinatesByCityName(cityName);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "An Error occurred while fetching data" });
    }
  }
}

module.exports = CoordController;

const express = require("express");
const CityController = require("../../controller/city.controller");
const router = express.Router();

router.get("/:lat/:lon", CityController.getCityName);

module.exports = router;

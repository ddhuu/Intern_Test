const express = require("express");
const CoordController = require("../../controller/coord.controller");
const router = express.Router();

router.get("/:cityName", CoordController.getCoordinatesByCityName);

module.exports = router;

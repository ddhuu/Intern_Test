"use strict";

const express = require("express");
const router = express.Router();

router.use("/api/v1/weather", require("./weather"));
router.use("/api/v1/coordinates", require("./coord"));
router.use("/api/v1/cityname", require("./city"));

router.use("/api/v1/user", require("./user"));

module.exports = router;

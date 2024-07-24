require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init DB

require("./dbs/init.db");

// Init Routes

app.use("", require("./routes"));

module.exports = app;

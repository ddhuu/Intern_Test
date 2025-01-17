const express = require("express");
const mongoose = require("mongoose");
const { Scheduler } = require("./scheduler");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// Init DB

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

// Init Cron Job

Scheduler();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

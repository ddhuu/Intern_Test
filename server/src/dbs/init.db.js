"use strict";

const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

class DataBase {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => console.log(err));
  }

  static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }
}

const instanceDB = DataBase.getInstance();

module.exports = instanceDB;

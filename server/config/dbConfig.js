const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on("open", () => {
  console.log("MongoDB database connection established successfully");
});

connection.on("error", (err) => {
  console.log("MongoDB database connection error");
});

module.exports = connection;

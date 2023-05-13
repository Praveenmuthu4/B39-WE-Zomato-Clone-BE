const express = require('express');
const app = express();
const parser = require("body-parser");
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

const RestaurantController = require("./controllers/Restaurant.controller");

app.use("/api/restaurants", RestaurantController);

module.exports = app
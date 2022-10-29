const express = require("express");
const route = express.Router();

const GETCartegory = require("../controllers/showCategory");

route.get("/:id", GETCartegory);

module.exports = route;

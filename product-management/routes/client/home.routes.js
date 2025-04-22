const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/client/home.controller");

routes.get('/',controllers.index);

module.exports = routes;

const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/client/products.controller");

routes.get('/',controllers.index);

routes.get("/:slug", controllers.detail);

module.exports = routes;
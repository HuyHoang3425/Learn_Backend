const express = require("express");
const routes = express.Router();
const controllers = require("../../controllers/client/products.controller");

routes.get('/',controllers.index);

routes.get("/:id", controllers.detail);

routes.get("/category/:slug", controllers.category);

module.exports = routes;
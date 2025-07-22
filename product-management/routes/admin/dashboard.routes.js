const express = require("express");
const routes = express.Router();
const controller = require("../../controllers/admin/dashboard.controller");
const systems = require("../../config/systems");

routes.get("/",controller.dashboard)
module.exports = routes;

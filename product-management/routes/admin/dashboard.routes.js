const express = require("express");
const routes = express.Router();
const controller = require("../../controllers/admin/dashboard.controller");
const systems = require("../../config/systems");
const PATH_ADMIN = systems.prefixAdmin;
routes.get(PATH_ADMIN+"/dashboard",controller.dashboard)
module.exports = routes;

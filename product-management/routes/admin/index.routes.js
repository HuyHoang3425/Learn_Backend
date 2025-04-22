const dashboardRoutes = require("./dashboard.routes");
const productsRoutes = require("./products.routes")
const systems = require("../../config/systems");
const PATH_ADMIN = systems.prefixAdmin;

module.exports = (app) => {
  app.use('/', dashboardRoutes);
  app.use(PATH_ADMIN + "/products",productsRoutes);
}
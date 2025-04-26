const dashboardRoutes = require("./dashboard.routes");
const productsRoutes = require("./products.routes");
const productCategory = require("./products-category.route");
const systems = require("../../config/systems");
const PATH_ADMIN = systems.prefixAdmin;

module.exports = (app) => {
  app.use('/', dashboardRoutes);
  app.use(PATH_ADMIN + "/products",productsRoutes);
  app.use(PATH_ADMIN + "/products-category",productCategory);
}
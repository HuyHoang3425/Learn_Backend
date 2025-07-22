const dashboardRoutes = require("./dashboard.routes");
const productsRoutes = require("./products.routes");
const productCategory = require("./products-category.route");
const roleRoutes = require('./role.route');
const systems = require("../../config/systems");
const accountRoutes = require('./account.route');
const authRoutes = require('./auth.route');
const settingRoutes = require("./setting.routes");
const authMiddleware = require('../../middlewares/auth.middleware');
const myAccountRoutes = require('./myaccount.route')
const PATH_ADMIN = systems.prefixAdmin;

module.exports = (app) => {
  app.use(PATH_ADMIN + "/dashboard",authMiddleware.requireAuth, dashboardRoutes);
  app.use(PATH_ADMIN + "/products",authMiddleware.requireAuth,productsRoutes);
  app.use(
    PATH_ADMIN + "/products-category",
    authMiddleware.requireAuth,
    productCategory
  );
  app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);
  app.use(PATH_ADMIN + "/auth",authRoutes);
  app.use(PATH_ADMIN + "/my_account",authMiddleware.requireAuth, myAccountRoutes);
  app.use(PATH_ADMIN + "/setting", authMiddleware.requireAuth, settingRoutes);
}
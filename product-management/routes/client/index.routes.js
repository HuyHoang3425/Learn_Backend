const productsRoutes = require("./products.routes");
const homeRoutes = require("./home.routes");

module.exports = (app) =>{
  app.use('/',homeRoutes);
  app.use('/products',productsRoutes);
}
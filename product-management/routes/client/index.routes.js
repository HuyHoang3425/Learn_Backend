const productsRoutes = require("./products.routes");
const homeRoutes = require("./home.routes");
const searchRoutes = require("./search.routes");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.routes");
const userRoutes = require("./user.routes");
const chatRoutes = require("./chat.route");
const usersRoutes = require("./users.route");
const roomChatRoutes = require("./room-chat.route");

const categoryMiddleware = require('../../middlewares/client/category.middleware');
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingGeneralMiddleware = require("../../middlewares/client/setting.middleware");
const authMiddleware = require('../../middlewares/client/auth.middleware')


module.exports = (app) =>{
  app.use(categoryMiddleware.category);


  app.use(cartMiddleware.cartId);

  app.use(settingGeneralMiddleware.settingGeneral);

  app.use(userMiddleware.userInfo);

  app.use('/',homeRoutes);

  app.use("/products", productsRoutes);

  app.use("/search", searchRoutes);

  app.use("/cart", cartRoutes);

  app.use("/checkout", checkoutRoutes);

  app.use("/user", userRoutes);

  app.use("/chat",authMiddleware.auth, chatRoutes);

  app.use("/users", authMiddleware.auth, usersRoutes);

  app.use("/room-chat", authMiddleware.auth, roomChatRoutes);

}

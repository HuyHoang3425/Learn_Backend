const express = require("express");
const routes = express.Router();
const controller = require("../../controllers/admin/products.controller");
const multer = require("multer");
// const storageMulter = require("../../helpers/storageMulter");
const middleware = require("../../middlewares/uploadCloud.middleware");

const upload = multer();
const validate = require("../../validates/admin/product.validate");

routes.get("/", controller.products);

routes.patch("/change-status/:status/:id", controller.changeStatus);

routes.patch("/change-multi", controller.changeMulti);

routes.delete("/delete/:id", controller.deleteProduct);

routes.get("/create", controller.create);

routes.post(
  "/create",
  upload.single("thumbnail"),
  middleware.upload,
  validate.createPost,
  controller.createPost
);

routes.get("/edit/:id", controller.edit);

routes.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);

routes.get("/detail/:id", controller.detail);
module.exports = routes;

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/products-category.controller');
const multer = require("multer");
const middleware = require("../../middlewares/uploadCloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/product-category.validate");

router.get('/',controller.category);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  middleware.upload,
  validate.createPost,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  middleware.upload,
  validate.createPost,
  controller.editPost
);

module.exports = router;
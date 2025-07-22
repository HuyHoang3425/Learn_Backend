const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller");
const multer = require("multer");
const middleware = require("../../middlewares/uploadCloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/account.validate");


router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  middleware.upload,
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  middleware.upload,
  validate.editPatch,
  controller.editPatch
);

module.exports = router;

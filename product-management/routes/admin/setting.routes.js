const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/setting.controller");
const multer = require("multer");
const middleware = require("../../middlewares/uploadCloud.middleware");
const upload = multer();

router.get("/general", controller.general);

router.patch(
  "/general",
  upload.single("logo"),
  middleware.upload,
  controller.generalPatch
);

module.exports = router;

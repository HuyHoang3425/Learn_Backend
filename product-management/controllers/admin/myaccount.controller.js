const { json } = require("body-parser");
const systemConfig = require("../../config/systems");
const Roles = require("../../model/role.model");

//[GET] /admin/my_account
module.exports.index = async (req, res) => {
   res.render("admin/pages/account/myaccount", {
     pageTitle: "Thông tin cá nhân",
   });
};


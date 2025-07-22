const { json } = require("body-parser");
const systemConfig = require("../../config/systems");
const Accounts = require("../../model/account.model");
const md5 = require("md5");

//[GET] /admin/auth/login
module.exports.login = async (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (token) {
    const user = await Accounts.findOne({ token: token });
    if (user) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
      return;
    } else {
      res.clearCookie("token");
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
      return;
    }
  } else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập",
    });
  }
};

//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await Accounts.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "email không tồn tại!");
    res.redirect("back");
    return;
  }
  if (md5(password) != user.password) {
    req.flash("error", "sai mật khẩu!");
    res.redirect("back");
    return;
  }
  if (user.status != "active") {
    req.flash("error", "tài khoản đã bị khoá");
    res.redirect("back");
    return;
  }
  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

//[GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};

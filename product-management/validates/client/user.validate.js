module.exports.registerPost = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `Vui lòng nhập tên tài khoản!`);
    res.redirect(`back`);
    return;
  }
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    res.redirect(`back`);
    return;
  }
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập mật khẩu!`);
    res.redirect(`back`);
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", `Vui lòng nhập lại mật khẩu!`);
    res.redirect(`back`);
    return;
  }
  next();
};


module.exports.loginPost = async (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    res.redirect(`back`);
    return;
  }
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập mật khẩu!`);
    res.redirect(`back`);
    return;
  }
  next();
};

module.exports.forgotPasswordPost = async (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    res.redirect(`back`);
    return;
  }
  next();
};



module.exports.resetPasswordPost = async (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập nhập mật khẩu mới!`);
    res.redirect(`back`);
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", `Vui lòng xác nhận lại mật khẩu mới!`);
    res.redirect(`back`);
    return;
  }
  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", `nhập lại mật khẩu không khớp!`);
    res.redirect(`back`);
    return;
  }
  next();
};
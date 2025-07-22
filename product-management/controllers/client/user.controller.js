const User = require("../../model/user.model");
const Cart = require("../../model/cart.model");
const ForgotPassword = require("../../model/forgotPassword.model");
const md5 = require("md5");
const generateHelper = require('../../helpers/generate');
const sendMailHelper = require("../../helpers/sendMail");

//[GET] user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng nhập",
  });
};

//[POST] user/register
module.exports.registerPost = async (req, res) => {
  console.log(req.body);
  const isEmail = await User.findOne({
    email: req.body.email,
    deleted:false,
  });
  if (isEmail) {
    req.flash("error", `Email đã tồn tại!`);
    res.redirect(`back`);
    return;
  }
  if(req.body.password != req.body.confirmPassword){
    req.flash("error", `Nhập lại mật khẩu không khớp!`);
    res.redirect(`back`);
    return;
  }
  delete req.body.confirmPassword;
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  req.flash("success", `Đăng ký thành công!`);
  res.redirect("back");
};

//[GET] user/login
module.exports.login = (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập",
  });
};


//[POST] user/login
module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", `Email không tồn tại!`);
    res.redirect(`back`);
    return;
  }
  if (md5(req.body.password) != user.password) {
    req.flash("error", `Mật khẩu sai!`);
    res.redirect(`back`);
    return;
  }
  if (user.status == "inactive") {
    req.flash("error", `Tài khoản đã bị khoá!`);
    res.redirect(`back`);
    return;
  }

  res.cookie("tokenUser", user.tokenUser);
  req.flash("success", `Đăng nhập thành công!`);

  console.log()
  await Cart.updateOne(
    {_id:req.cookies.cartId},
    {
      user_id:user.id,
    }
  )
  res.redirect("/");

};


//[GET] user/logout
module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect('/');
};

//[GET] user/password/forgot
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/user/forgotPassword", {
    pageTitle: "Quên mật khẩu",
  });
};

//[GET] user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const otp = generateHelper.generateRandomNumber(6);
  const user = await User.findOne({
    email:req.body.email,
  });
  if (!user) {
    req.flash("error", `Email không tồn tại!`);
    res.redirect(`back`);
    return;
  }
  const objectForgotPassword = {
    email: req.body.email,
    otp: otp,
    expireAt: new Date(),
  };
  const forgot = new ForgotPassword(objectForgotPassword);
  await forgot.save();
  
  const subject = "Mã xác nhận OTP";
  sendMailHelper.sendMail(req.body.email,subject,otp);

  res.redirect(`/user/password/otp?email=${req.body.email}`);
};


//[GET] user/password/forgot
module.exports.otpPassword = (req, res) => {
  const email = req.query.email;
  console.log(email);   
  res.render("client/pages/user/otpPassword", {
    pageTitle: "Nhập OTP",
    email:email,
  });
};

//[POST] user/password/forgot
module.exports.otpPasswordPost = async (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email; 

  const result = await ForgotPassword.findOne({
    email:email,
    otp:otp,
  })
  if(!result){
    req.flash("error", `OTP không hợp lệ!`);
    res.redirect(`back`);
    return;
  }
  const user = await User.findOne({
    email:email,
  });
  res.cookie("tokenUser",user.tokenUser);
  res.redirect("/user/password/reset");
  
};


//[GET] user/password/reset
module.exports.resetPassword = (req, res) => { 
  res.render("client/pages/user/resetPassword", {
    pageTitle: "Đặt lại mật khẩu",
  });
};

//[POST] user/password/reset
module.exports.resetPasswordPost = async  (req, res) => { 
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
      tokenUser:tokenUser,
    },{
      password: md5(password),
    });

    res.redirect("/");
    req.flash("success","đổi mật khẩu thành công!");
};
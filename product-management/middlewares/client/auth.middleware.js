const User = require("../../model/user.model");

module.exports.auth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`/user/login`);
    return;
  }
  const user = await User.findOne({
    tokenUser: req.cookies.tokenUser,
  });
  if (!user) {
    res.redirect(`/user/login`);
    return;
  }
  res.locals.user = user;
  next();
};

const systemConfig = require("../config/systems");
const Account = require("../model/account.model");
const Roles = require("../model/role.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({
      token: req.cookies.token,
    });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      const role = await Roles.findOne({
        _id:user.role_id,
      });
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};

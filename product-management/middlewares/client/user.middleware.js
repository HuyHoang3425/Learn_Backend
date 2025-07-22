const User = require('../../model/user.model');

module.exports.userInfo = async (req,res,next) =>{
  const user = await User.findOne({
    tokenUser:req.cookies.tokenUser,
  }).select("-password");

  if(user){
   res.locals.user = user;
  }
  next();
}
const Accounts= require('../../model/account.model');
const Roles = require("../../model/role.model");
const systemConfig = require("../../config/systems");
const md5 = require("md5");

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
  const find = {
    deleted:false,
  }
  const records = await Accounts.find(find).select("-password -token");
  for(const record of records)
  {
    const role = await Roles.findOne({
      _id:record.role_id,
      deleted:false,
    });
    console.log(role);
    record.role= role;
  }
  res.render("admin/pages/account/index", {
    pageTitle: "Tài khoản",
    records: records,
  });
};

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const find = {
    deleted:false,
  }
  const role = await Roles.find(find);

  res.render("admin/pages/account/create", {
    pageTitle: "Tạo tài khoản",
    role:role,
  });
};

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const email = req.body.email;
  const isEmail = await Accounts.findOne({
    email:email,
    deleted:false,
  });
  if(isEmail)
  {
    req.flash("error","email đã tồn tại!");
    res.redirect("back");
  }else{
    req.body.password = md5(req.body.password);
    const records = new Accounts(req.body);
    await records.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try{
    let find = {
    _id:req.params.id,
    deleted: false,
  };
  const records = await Accounts.findOne(find);
  const role = await Roles.find({deleted:false});
  res.render("admin/pages/account/edit", {
    pageTitle: "Chỉnh sửa tài khoản",
    records: records,
    role:role,
  });
  }catch(error)
  {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

module.exports.editPatch = async (req, res) => {
  const email = req.body.email;
  const id = req.params.id;
  const isEmail = await Accounts.findOne({
    _id:{ $ne: id},
    email:email,
    deleted:false,
  });
  if(isEmail)
  {
    req.flash("error","email đã tồn tại!");
    res.redirect("back");
  }else{
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Accounts.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công !");
    res.redirect("back");
  }
};
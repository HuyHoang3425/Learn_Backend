const { json } = require("body-parser");
const systemConfig = require("../../config/systems");
const Roles = require("../../model/role.model");

//[GET] /admin/role
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Roles.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Roles.find(find);
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo nhóm quyền",
    records: records,
  });
};
//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  try {
    const records = await Roles(req.body);
    await records.save();
    res.redirect("back");
  } catch (error) {
    res.redirect("back");
  }
};
//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    _id:req.params.id,
    deleted: false,
  };
  const records = await Roles.findOne(find);
  res.render("admin/pages/roles/edit", {
    pageTitle: "Chỉnh sửa nhóm quyền",
    records: records,
  });
};
//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  await Roles.updateOne({ _id: req.params.id },req.body);
  req.flash("success", "Cập nhật thành công !");
  res.redirect("back");
};
//[GET] /admin/roles/permissions
module.exports.permission = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Roles.find(find);
  res.render("admin/pages/roles/permission", {
    pageTitle: "Phân quyền",
    records: records,
  });
};
//[PATCH] /admin/roles/permissions
module.exports.permissionPatch = async (req, res) => {
  const permission = JSON.parse(req.body.permissions);
  for (const item of permission) {
    await Roles.updateOne({ _id: item._id }, { permissions:item.permissions});
  }

  req.flash("success","cập nhật phân quyền thành công!");
  res.redirect("back");
};
const SettingGeneral = require('../../model/settings-general.model');

module.exports.general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});

  res.render("admin/pages/setting/general.pug", {
    pageTitle: "Cài đặt chung",
    settingGeneral:settingGeneral,
  });
};

module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  if(settingGeneral){
    await SettingGeneral.updateOne({
      _id:settingGeneral.id
    },
    req.body)
  }else{
    await SettingGeneral.create(req.body)
  }
  req.flash("success", "Cập nhật thành công !");
  res.redirect("back")
};
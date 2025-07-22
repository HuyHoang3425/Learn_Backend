const RoomChat = require("../../model/room-chat.model");
const SettingGeneral = require("../../model/settings-general.model");

module.exports.isAccess = async (req, res, next) => {
  try{
    const id = res.locals.user.id;
  const roomChatId = req.params.roomChatId;

  const isAccessRoomChat = await RoomChat.findOne({
    _id:roomChatId,
    "users.user_id":id,
    deleted:false,
  })
  if(isAccessRoomChat){
    next()
  }else{
    res.redirect('/')
  }
  }catch(error){
    res.redirect("/");
  }
};

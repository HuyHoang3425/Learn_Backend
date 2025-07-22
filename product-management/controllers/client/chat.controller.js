const Chat = require('../../model/chat.model');
const User = require("../../model/user.model");
module.exports.index = async (req,res) =>{
  const id = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  const roomChatId = req.params.roomChatId;
  _io.once("connection", (socket) => {
    socket.join(roomChatId)
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      await Chat.create({
        room_chat_id:roomChatId,
        user_id: id,
        content: content,
      });

      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        userId: id,
        fullName: fullName,
        content: content,
      });
    });

    socket.on("CLIENT_SEND_TYPING",(type) =>{
      socket.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        userId: id,
        fullName: fullName,
        type:type,
      });
    });
  });

  //lấy data tin nhắn đổ giao diện
  const chats = await Chat.find({
    room_chat_id:roomChatId,
    deleted:false
    });
  for(const chat of chats){
    const user = await User.findOne({_id:chat.user_id}).select("fullName");
    chat.fullName = user.fullName;
  }
  res.render("client/pages/chat/index",{
    pageTitle:"Chat",
    chats:chats,
  })
}

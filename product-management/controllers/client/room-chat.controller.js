const RoomChat = require('../../model/room-chat.model');
const User = require('../../model/user.model');
const { friends } = require('./users.controller');

module.exports.index = async (req, res) => {
  const rooms = await RoomChat.find({
    typeRoom:"group",
    deleted:false,
    "users.user_id":res.locals.user.id,
  })
  res.render("client/pages/room-chat/index.pug", {
    pageTitle: "Phòng chat",
    rooms:rooms
  });
};

module.exports.create = async (req, res) => {
  const listFriends = res.locals.user.listFriends;
  if(listFriends){
    for(const item of listFriends){
      const infoFriend = await User.findOne({_id:item.user_id}).select("fullName");
      item.infoFriend = infoFriend;
    }
  }
  res.render("client/pages/room-chat/create.pug", {
    pageTitle: "Tạo Phòng chat",
    friends:listFriends,
  });
};

module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const userId = req.body.userId;
  const dataChat = {
    title:title,
    typeRoom:"group",
    users:[
      {
        user_id:res.locals.user.id,
        role:"superAdmin"
      }
    ]
  }
  userId.forEach(item =>{
    dataChat.users.push({
      user_id:item,
      role:"user"
    });
  });
  const roomChat = await RoomChat.create(dataChat)
  res.redirect(`/chat/${roomChat.id}`);
};

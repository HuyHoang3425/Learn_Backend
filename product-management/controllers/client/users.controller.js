const User = require('../../model/user.model');
const usersSocket = require('../../sockets/users.socket');
module.exports.notFriend = async (req,res) => {
  usersSocket(req,res);
  const userId = res.locals.user.id;
  const user = await User.findOne({_id:userId});
  const users = await User.find({
     _id: {
      $nin: [userId, ...user.requestFriends,...user.acceptFriends]
    },
    status:"active",
    deleted:false,
  });
  
  res.render("client/pages/users/notFriend",{
    pageTitle:"Danh sách người dùng",
    users:users,
  })
}

module.exports.request = async (req, res) => {
  usersSocket(req, res);
  const userId = res.locals.user.id;
  const user = await User.findOne({ _id: userId });
  const users = await User.find({
    _id: {
      $in: [...user.requestFriends],
    },
    status: "active",
    deleted: false,
  });

  res.render("client/pages/users/request", {
    pageTitle: "Lời mời đã gửi",
    users: users,
  });
};

module.exports.accept = async (req, res) => {
  usersSocket(req, res);
  const userId = res.locals.user.id;
  const user = await User.findOne({ _id: userId });
  const users = await User.find({
    _id: {
      $in: [...user.acceptFriends],
    },
    status: "active",
    deleted: false,
  });

  res.render("client/pages/users/accept", {
    pageTitle: "Lời mời kết bạn",
    users: users,
  });
};

module.exports.friends = async (req,res) =>{
  usersSocket(req, res);
  const userId = res.locals.user.id;
  const myUser = await User.findById(userId);
  const listFriends = myUser.listFriends;
  const listFriendsId = listFriends.map(item => item.user_id)
  const users = await User.find({
    _id: { $in: listFriendsId },
    status: "active",
    deleted: false,
  }).select("id fullName");

  users.forEach(user => {
    const infoUser = listFriends.find(item => item.user_id === user.id)
    user.roomChatId = infoUser.room_chat_id;
  })
  res.render("client/pages/users/friend", {
    pageTitle: "Danh sách bạn bè",
    users: users,
  });
}

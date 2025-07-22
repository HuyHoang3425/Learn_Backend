const { updateOne } = require("../model/chat.model");
const User = require("../model/user.model");
const RoomChat = require("../model/room-chat.model");

module.exports = async (req, res) => {
  _io.once("connection", (socket) => {
    //add
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      const userA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      const userB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (!userA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: {
              requestFriends: userId,
            },
          }
        );
      }
      if (!userB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              acceptFriends: myUserId,
            },
          }
        );
      }
      //lấy độ dài của B trả về cho B
      console.log(userId);
      const B = await User.findOne({ _id: userId });
      const lengthBadgeAccept = B?.acceptFriends?.length || 0;
      socket.broadcast.emit("SERVER_RETURN_BADGE_ACCEPT", {
        userId,
        lengthBadgeAccept,
      });
      //lấy thông tin của A trả về cho B
      const infoA = await User.findOne({ _id: myUserId }).select("id fullName");
      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT", {
        userId,
        infoA,
      });
    });
    //cancel
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      const userA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });
      const userB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });
      if (userA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: {
              requestFriends: userId,
            },
          }
        );
      }
      if (userB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: {
              acceptFriends: myUserId,
            },
          }
        );
      }
      //lấy độ dài của B trả cho B
      const B = await User.findOne({ _id: userId });
      const lengthBadgeAccept = B.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_BADGE_ACCEPT", {
        userId,
        lengthBadgeAccept,
      });

      //lấy thông tin ID của A trả về cho B để
      socket.broadcast.emit("SERVER_RETURN_ID_CANCEL", {
        userId,
        myUserId,
      });
    });
    //refuse
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      const userA = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });
      const userB = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });
      if (userA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: {
              acceptFriends: userId,
            },
          }
        );
      }
      if (userB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: {
              requestFriends: myUserId,
            },
          }
        );
      }

      const A = await User.findOne({ _id: myUserId });
      const lengthBadgeRefuse = A.acceptFriends.length;
      socket.emit("SERVER_RETURN_BADGE_REFUSE", {
        myUserId,
        lengthBadgeRefuse,
      });
    });
    //accept
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;
      const userA = await User.findOne({
        _id: myUserId,
        acceptFriends: userId,
      });
      const userB = await User.findOne({
        _id: userId,
        requestFriends: myUserId,
      });

      let roomChat;
      console.log("userA:", userA);
      console.log("userB:", userB);

      if (userA && userB) {
        roomChat = await RoomChat.create({
          typeRoom: "friend",
          users: [
            {
              user_id: userA.id,
              role: "superAdmin",
            },
            {
              user_id: userB.id, 
              role: "superAdmin",
            },
          ],
        });
      }
      console.log(roomChat)
      if (userA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: {
              listFriends: {
                user_id: userId,
                room_chat_id: roomChat.id.toString(),
              },
            },
            $pull: {
              acceptFriends: userId,
            },
          }
        );
      }
      if (userB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              listFriends: {
                user_id: myUserId,
                room_chat_id: roomChat.id.toString(),
              },
            },
            $pull: {
              requestFriends: myUserId,
            },
          }
        );
      }
    });
  });
};

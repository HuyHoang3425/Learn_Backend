//Chức năng thêm bạn bè
const buttonAdd = document.querySelectorAll(".inner-buttons .btn-primary");
buttonAdd.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".inner-buttons").classList.add("add");
    const userId = button.getAttribute("btn-add");
    socket.emit("CLIENT_ADD_FRIEND", userId);
  });
});
//Chức năng huỷ bạn bè
const buttonCancel = document.querySelectorAll("[btn-cancel]");
buttonCancel.forEach((button) => {
  button.addEventListener("click", () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy kết bạn không?"
    );
    if (isConfirmed) {
      button.closest(".inner-buttons").classList.remove("add");
      const userId = button.getAttribute("btn-cancel");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    }
  });
});
//Chức năng từ chối kết bạn
const refuseFriends = () =>{
  const buttonRefuse = document.querySelectorAll("[btn-refuse]");
  buttonRefuse.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirmed = window.confirm(
        "Bạn có chắc chắn muốn từ chối kết bạn không?"
      );
      if (isConfirmed) {
        button.closest(".inner-buttons").classList.add("refuse");
        const userId = button.getAttribute("btn-refuse");
        socket.emit("CLIENT_REFUSE_FRIEND", userId);
      }
    });
  });
}
refuseFriends();
//Chức năng chấp nhận kết bạn
const acceptFriends = () =>{
  const buttonAccept = document.querySelectorAll("[btn-accept]");
  buttonAccept.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".inner-buttons").classList.add("accept");
      const userId = button.getAttribute("btn-accept");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  });
}
acceptFriends();
//hiển thị thông báo khi gửi lời mời kết bạn
socket.on("SERVER_RETURN_BADGE_ACCEPT", (data) => {
  const badgeAccept = document.querySelector("[badge-accept]");
  if (badgeAccept.getAttribute("badge-accept") == data.userId) {
    badgeAccept.innerHTML = data.lengthBadgeAccept;
  }
});
//hiển thị thông tin khi người khác gửi lời mời kết bạn
socket.on("SERVER_RETURN_INFO_ACCEPT", (data) => {
  const bodyAccept = document.querySelector("[body]");
  if(bodyAccept){
    const userId = bodyAccept.getAttribute("body");
    if (userId == data.userId) {
      const boxUser = document.createElement("div");
      boxUser.classList.add("box-user");
      boxUser.setAttribute("user_id", data.infoA._id);
      boxUser.innerHTML = `
    <div class="inner-avatar">
      <img src="https://robohash.org/hicveldicta.png" alt="Le Van A" />
    </div>
    <div class="inner-info">
      <div class="inner-name"> ${data.infoA.fullName} </div>
      <div class="inner-buttons">
        <button btn-accept="${data.infoA._id}" class="btn btn-sm btn-primary mr-1">
          Chấp nhận
        </button>
        <button
          btn-accepted="${data.infoA._id}"
          class="btn btn-sm btn-primary mr-1"
          disabled
        >
          Đã chấp nhận
        </button>
        <button btn-refuse="${data.infoA._id}" class="btn btn-sm btn-secondary mr-1">
          Xoá
        </button>
        <button
          btn-refused="${data.infoA._id}"
          class="btn btn-sm btn-secondary mr-1"
          disabled
        >
          Đã xoá
        </button>
      </div>
    </div>
    `;
      bodyAccept.appendChild(boxUser);
    }
  }
  //từ chối kết bạn
  refuseFriends();
  //chấp nhận kết bạn
  acceptFriends();


  const bodyNotFriends = document.querySelector("[body_not_friends]");
  if (bodyNotFriends) {
    if (bodyNotFriends.getAttribute("body_not_friends") == data.userId) {
      const boxUserA = bodyNotFriends.querySelector(
        `[user_id='${data.infoA._id}']`
      );
      bodyNotFriends.removeChild(boxUserA);
    }
  }
});
//cập nhật số lượng khi từ chối kết bạn
socket.on("SERVER_RETURN_BADGE_REFUSE", (data) => {
  const badgeAccept = document.querySelector("[badge-accept]");
  if (badgeAccept.getAttribute("badge-accept") == data.myUserId) {
    badgeAccept.innerHTML = data.lengthBadgeRefuse;
  }
});

//khi ấn huỷ thì hiển thị lại giao diện xoá người dùng
socket.on("SERVER_RETURN_ID_CANCEL", (data) => {
  const bodyAccept = document.querySelector("[body]");
  if(bodyAccept){
    if (bodyAccept.getAttribute("body") == data.userId) {
      const boxUserA = bodyAccept.querySelector(`[user_id='${data.myUserId}']`);
      bodyAccept.removeChild(boxUserA);
    }
  }

  
});

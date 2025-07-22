import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

//CLIENT_SEND_MESSAGE
const button = document.querySelector(".send-btn.btn-send");
const input = document.querySelector("#messageInput");
button.addEventListener("click", () => {
  let content = input.value;
  if (content) {
    socket.emit("CLIENT_SEND_MESSAGE", content);
    input.value = "";
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }
});
function scrollToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
window.addEventListener("DOMContentLoaded", () => {
  scrollToBottom();
});
//CLIENT_SEND_MESSAGE

socket.on("SERVER_RETURN_MESSAGE", (data) => {
  console.log(data)
  const chatMessageBody = document.querySelector(".chat-messages");
  const user_id = document.querySelector("[user_id]").getAttribute("user_id");
  const divMessage = document.createElement("div"); // thẻ chứa toàn bộ tin nhắn
  const divContent = document.createElement("div"); // thẻ nội dung

  const boxTyping = document.querySelector(".inner-left-typing");

  let htmlFullName = "";

  if (user_id == data.userId) {
    divMessage.classList.add("message", "sent");
  } else {
    divMessage.classList.add("message", "received");
    htmlFullName = `<div class="avatar user-a">${data.fullName}</div>`;
  }
  divContent.classList.add("message-content");
  divContent.innerHTML = `
  ${htmlFullName}
  <div class="message-bubble">
    <div class="message-text">${data.content}</div>
  </div>
  `;
  divMessage.appendChild(divContent);
  chatMessageBody.insertBefore(divMessage,boxTyping);
  scrollToBottom();
});
//show typing
var timeOut;
const showTyping = ()=>{
  socket.emit("CLIENT_SEND_TYPING", "show");
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
}
//Emoji picker element
const emojiPicker = document.querySelector("emoji-picker");
emojiPicker.addEventListener("emoji-click", (event) => {
  input.value += event.detail.unicode;
  const lengt = input.value.lengt;
  input.setSelectionRange(lengt,lengt);
  input.focus();
  showTyping();
});

const emojiButton = document.querySelector(".send-btn.btn-icon");

if (emojiButton) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(button, tooltip);

  emojiButton.onclick = () => {
    tooltip.classList.toggle("shown");
  };

  //typing

  input.addEventListener("keyup",() =>{
    showTyping();
  })

 

}
const typing = document.querySelector(".inner-left-typing");
if(typing){
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if(data.type == "show"){
      const exitsTyping = typing.querySelector(`[user-id="${data.userId}"]`);
      if (!exitsTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);
        boxTyping.innerHTML = `
          <div class="inner-name">${data.fullName}</div>
          <div class="inner-dots">
          <span></span>
          <span></span>
          <span></span>
          </div>`;

        typing.appendChild(boxTyping);
      }
      scrollToBottom();
    }else{
      const boxTypingRemove = typing.querySelector(
        `[user-id="${data.userId}"]`
      );
      if(boxTypingRemove){
        typing.removeChild(boxTypingRemove);
      }
    }
    
  });
}

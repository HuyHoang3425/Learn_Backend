//change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    formChangeStatus.pre
  buttonChangeStatus.forEach(button =>{
    button.addEventListener("click",function(){
      const status = this.getAttribute("data-status");
      const id = this.getAttribute("data-id");
      let newStatus = status == "active" ? "inactive" :"active";
      const action = path + `/${newStatus}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
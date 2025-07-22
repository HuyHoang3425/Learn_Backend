const buttonStatus = document.querySelectorAll("[button-status]");

let url = new URL(window.location.href);

buttonStatus.forEach((button) => {
  button.addEventListener("click", function () {
    buttonStatus.forEach((item) => {
      item.classList.remove("active");
    });
    button.classList.add("active");
    const status = button.getAttribute("button-status");
    if (status) {
      url.searchParams.set("status", status);
    } else {
      url.searchParams.delete("status");
    }
    window.location.href = url.href;
  });
});

// form-search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//pagination
const buttonPage = document.querySelectorAll("[button-page]");
buttonPage.forEach((btn) => {
  btn.addEventListener("click", function () {
    const page = this.getAttribute("button-page");
    url.searchParams.set("page", page);
    window.location.href = url.href;
  });
});

//checkbox multi
const checkboxMulti = document.querySelector(".checkbox-multi");
if (checkboxMulti) {
  const inputCheckAll = document.querySelector("input[name='checkall']");
  const inputID = document.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", function () {
    if (inputCheckAll.checked) {
      inputID.forEach((check) => {
        check.checked = true;
      });
    } else {
      inputID.forEach((check) => {
        check.checked = false;
      });
    }
  });
  inputID.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      const inputLenght = inputID.length;

      if (countChecked == inputLenght) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

//form checkbox multi
const formCheckbox = document.querySelector("[form-change-multi]");
if (formCheckbox) {
  formCheckbox.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xoá sản phẩm này?");
      if (!isConfirm) {
        return;
      }
    }
    if (inputChecked.length > 0) {
      let ids = [];
      const input = document.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.id;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      input.value = ids.join(", ");
      formCheckbox.submit();
    } else {
      alert("bạn cần chọn ít nhất 1 bản ghi");
    }
  });
}

//delete product
const buttonDelete = document.querySelectorAll("[button-delete]");

if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete");
  const path = formDelete.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("bạn có chắc muốn xoá sản phẩm này?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}

//Show alert
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  console.log(closeAlert);
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

//upload images
const uploadImage = document.querySelector("[upload-image]");
const closeImage = document.querySelector("[close-img]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      closeImage.style.display = "flex";
      closeImage.addEventListener("click", () => {
        uploadImagePreview.src = "";
        uploadImageInput.value = "";
        closeImage.style.display = "none";
      });
    }
  });
}

//sort
const sort = document.querySelector("[sort]");

if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = document.querySelector("[sort-select]");
  const sortClear = document.querySelector("[sort-clear]");
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortkey, sortvalue] = value.split("-");
    url.searchParams.set("sortkey", sortkey);
    url.searchParams.set("sortvalue", sortvalue);
    window.location.href = url.href;
  });
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortkey");
    url.searchParams.delete("sortvalue");
    window.location.href = url.href;
  });
}
//  
const sortkey = url.searchParams.get("sortkey");
const sortvalue = url.searchParams.get("sortvalue");
const value = `${sortkey}-${sortvalue}`;
const optionSelected = document.querySelector(`option[value="${value}"]`);
if(optionSelected)
{
  optionSelected.selected = true;
}



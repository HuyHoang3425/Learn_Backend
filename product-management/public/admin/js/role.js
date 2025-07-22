const buttonSubmit = document.querySelector("[button-submit]");
buttonSubmit.addEventListener("click", function () {
  const rows = document.querySelectorAll("[data-name]");
  const permissions = [];
  rows.forEach((row) => {
    const name = row.getAttribute("data-name");
    const inputs = row.querySelectorAll("input");
    if (name == "id") {
      permissions.push({
        _id: row.value,
        permissions: [],
      });
    } else {
      inputs.forEach((input, index) => {
        const checked = input.checked;
        if(checked)
        {
          permissions[index].permissions.push(name);
        }
      });
    }
  });
  if(permissions.length > 0)
  {
    const formPermission = document.querySelector("#form-change-permission");
    const input = formPermission.querySelector("input");
    input.value = JSON.stringify(permissions);
    formPermission.submit();
  }
});


//permission default
const records = document.querySelector("[data-records]").getAttribute("data-records");
if(records)
{
  const data = JSON.parse(records);
  const table = document.querySelector(".table");
  data.forEach((data,index) =>{
    const permissions = data.permissions;
    permissions.forEach(item =>{
      const rows = document.querySelector(`[data-name=${item}]`);
      input = rows.querySelectorAll("input");
      input[index].checked = true;
    })
  })
}


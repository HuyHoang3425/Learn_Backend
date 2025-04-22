module.exports = (query) =>{
  const filterButton = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    },
  ]
  if (query.status) {
    const index = filterButton.findIndex(item => item.status == query.status);
    filterButton[index].class = "active";
  }
  else {
    const index = filterButton.findIndex(item => item.status == "");
    filterButton[index].class = "active";
  }

  return filterButton;
}
let count = 0;
function createTree(arr, parentID = "") {
  const tree = [];
  arr.forEach((item) => {
    if (item.parent_id === parentID) {
      count++;
      const newItem = item;
      newItem.index = count;
      const child = createTree(arr, item.id);
      if (child.length > 0) {
        newItem.children = child;
      }
      tree.push(newItem);
    }
  });
  return tree;
}

module.exports.tree = (arr, parentID = "") => {
  count = 0;
  const tree = createTree(arr, (parentID = ""));
  return tree;
};

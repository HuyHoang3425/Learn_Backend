const ProductsCategory = require("../model/products-category.model");

const getSubCategory = async (parentId) => {
  const subs = await ProductsCategory.find({
    parent_id: parentId,
    status: "active",
    deleted: false,
  });

  let allSub = [...subs];
  for (const sub of subs) {
    const childs = await getSubCategory(sub.id);
    allSub = allSub.concat(childs);
  }
  return allSub;
};

module.exports = {
  getSubCategory,
};
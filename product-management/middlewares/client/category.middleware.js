const ProductsCategory = require("../../model/products-category.model");
const createTreeHelper = require("../../helpers/createTree");
module.exports.category = async (req, res, next) => {
  find = {
    deleted: false,
  };
  const records = await ProductsCategory.find(find);
  const tree = createTreeHelper.tree(records);
  res.locals.layoutCategory = tree;
  next();
};

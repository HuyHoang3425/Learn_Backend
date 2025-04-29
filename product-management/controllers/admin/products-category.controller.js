const ProductsCategory = require('../../model/products-category.model');
const systemConfig = require('../../config/systems');
const createTreeHelper = require('../../helpers/createTree');
//[GET] /products-category
module.exports.category = async (req,res) =>{
  find = {
    deleted:false,
  }
  const records = await ProductsCategory.find(find);
  const tree = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/index",{
    pageTitle:"Danh mục sản phẩm",
    records:tree,
  });
}

//[GET] /products-category/create
module.exports.create = async (req,res) =>{
  const find = {
    deleted:false,
  }
  const records = await ProductsCategory.find(find);

  const tree = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/create",{
    pageTitle:"Thêm danh mục sản phẩm",
    records:tree,
  });
}

//[POST] /products-category/create
module.exports.createPost = async (req,res) =>{
  if (req.body.position == "") {
    const count = await ProductsCategory.countDocuments();
    req.body.position = count+ 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const category = new ProductsCategory(req.body);
  await category.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}
